from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select, SQLModel
from datetime import datetime, timedelta
from typing import List, Dict, Any
import uvicorn
import json

from database import engine, get_session, create_db_and_tables
from models import Recipe, RecipeCreate, RecipeRead, User, UserCreate, UserPreferences
from auth import (
    get_current_user,
    create_access_token,
    authenticate_user,
    get_password_hash,
    Token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from openai_service import generate_meal_plan
from fastapi.security import OAuth2PasswordRequestForm

# Initialize database
create_db_and_tables()

app = FastAPI(title="Vital Bites API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register", response_model=User)
def register_user(user: UserCreate, session: Session = Depends(get_session)):
    # Check if user already exists
    db_user = session.exec(select(User).where(User.email == user.email)).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        name=user.name,
        hashed_password=hashed_password
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

@app.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    user = authenticate_user(form_data.username, form_data.password, session)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.post("/api/meal-plan/generate")
async def generate_weekly_meal_plan(
    preferences: UserPreferences,
    current_user: User = Depends(get_current_user)
) -> Dict[str, Any]:
    try:
        meal_plan = await generate_meal_plan(preferences)
        return json.loads(meal_plan)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate meal plan: {str(e)}"
        )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)