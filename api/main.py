from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from typing import Dict, Any
import uvicorn
import json
import firebase_admin
from firebase_admin import auth as firebase_auth

from firestore_db import FirestoreDB
from models import UserPreferences, Recipe, RecipeCreate, UserCreate
from auth import (
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    get_current_user
)
from openai_service import generate_meal_plan

app = FastAPI(title="Vital Bites API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
async def register_user(user: UserCreate):
    try:
        # Create user in Firebase Auth
        user_record = firebase_auth.create_user(
            email=user.email,
            password=user.password,
            display_name=user.name
        )
        
        # Create user document in Firestore
        await FirestoreDB.create_user(user_record.uid, {
            'email': user.email,
            'name': user.name
        })
        
        return {
            'id': user_record.uid,
            'email': user_record.email,
            'name': user_record.display_name
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        # Verify the user with Firebase Auth
        user = firebase_auth.get_user_by_email(form_data.username)
        
        # Create custom token
        custom_token = firebase_auth.create_custom_token(user.uid)
        
        # Create access token for API
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.uid},
            expires_delta=access_token_expires
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "firebase_token": custom_token.decode()
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

@app.get("/me")
async def read_users_me(current_user: str = Depends(get_current_user)):
    try:
        user_data = await FirestoreDB.get_user(current_user)
        if not user_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        return user_data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.post("/api/meal-plan/generate")
async def generate_weekly_meal_plan(
    preferences: UserPreferences,
    current_user: str = Depends(get_current_user)
) -> Dict[str, Any]:
    try:
        # Generate meal plan using OpenAI
        meal_plan = await generate_meal_plan(preferences)
        
        # Save to Firestore
        await FirestoreDB.save_meal_plan(current_user, json.loads(meal_plan))
        
        return json.loads(meal_plan)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate meal plan: {str(e)}"
        )

@app.get("/api/meal-plan")
async def get_meal_plan(current_user: str = Depends(get_current_user)):
    try:
        meal_plan = await FirestoreDB.get_meal_plan(current_user)
        if not meal_plan:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No meal plan found"
            )
        return meal_plan
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.get("/api/preferences")
async def get_preferences(current_user: str = Depends(get_current_user)):
    try:
        preferences = await FirestoreDB.get_user_preferences(current_user)
        if not preferences:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No preferences found"
            )
        return preferences
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.put("/api/preferences")
async def update_preferences(
    preferences: Dict[str, Any],
    current_user: str = Depends(get_current_user)
):
    try:
        await FirestoreDB.update_user_preferences(current_user, preferences)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.get("/api/shopping-list")
async def get_shopping_list(current_user: str = Depends(get_current_user)):
    try:
        items = await FirestoreDB.get_shopping_list(current_user)
        return items
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.post("/api/shopping-list")
async def add_shopping_item(
    item: Dict[str, Any],
    current_user: str = Depends(get_current_user)
):
    try:
        item_id = await FirestoreDB.add_shopping_item(current_user, item)
        return {"id": item_id}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.put("/api/shopping-list/{item_id}")
async def update_shopping_item(
    item_id: str,
    item: Dict[str, Any],
    current_user: str = Depends(get_current_user)
):
    try:
        await FirestoreDB.update_shopping_item(current_user, item_id, item)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.delete("/api/shopping-list/{item_id}")
async def delete_shopping_item(
    item_id: str,
    current_user: str = Depends(get_current_user)
):
    try:
        await FirestoreDB.delete_shopping_item(current_user, item_id)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.delete("/api/shopping-list")
async def clear_shopping_list(current_user: str = Depends(get_current_user)):
    try:
        await FirestoreDB.clear_shopping_list(current_user)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)