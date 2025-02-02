from datetime import datetime
from typing import Dict, List, Optional
from pydantic import BaseModel, EmailStr, Field as PydanticField
from sqlmodel import SQLModel, Field
import json

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)  # Changed from EmailStr to str
    name: str
    
class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(UserBase):
    email: EmailStr  # Keep EmailStr validation for the input model
    password: str

class UserRead(UserBase):
    id: int
    created_at: datetime

class RecipeBase(BaseModel):
    name: str
    image: str
    prep_time: str
    servings: int
    difficulty: str
    ayurvedic: str
    tags: List[str]
    ingredients: List[str]
    instructions: List[str]
    calories: int
    protein: int
    carbs: int
    fat: int

class Recipe(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    name: str
    image: str
    prep_time: str
    servings: int
    difficulty: str
    ayurvedic: str
    tags_json: str = Field(default='[]')
    ingredients_json: str = Field(default='[]')
    instructions_json: str = Field(default='[]')
    calories: int
    protein: int
    carbs: int
    fat: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

    @property
    def tags(self) -> List[str]:
        return json.loads(self.tags_json)

    @tags.setter
    def tags(self, value: List[str]):
        self.tags_json = json.dumps(value)

    @property
    def ingredients(self) -> List[str]:
        return json.loads(self.ingredients_json)

    @ingredients.setter
    def ingredients(self, value: List[str]):
        self.ingredients_json = json.dumps(value)

    @property
    def instructions(self) -> List[str]:
        return json.loads(self.instructions_json)

    @instructions.setter
    def instructions(self, value: List[str]):
        self.instructions_json = json.dumps(value)

class RecipeCreate(RecipeBase):
    pass

class RecipeRead(RecipeBase):
    id: int
    user_id: int
    created_at: datetime

class UserPreferences(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    targets_json: str = Field(default='{}')
    health_focus_json: str = Field(default='{}')
    dietary_restrictions_json: str = Field(default='[]')
    time_availability_json: str = Field(default='{}')
    about: str
    favorite_foods: str
    sample_meal_plan: str
    social_media_favorites: str
    familiarity_level: int
    cultural_background_json: str = Field(default='[]')

    @property
    def targets(self) -> Dict[str, int]:
        return json.loads(self.targets_json)

    @targets.setter
    def targets(self, value: Dict[str, int]):
        self.targets_json = json.dumps(value)

    @property
    def health_focus(self) -> Dict[str, str]:
        return json.loads(self.health_focus_json)

    @health_focus.setter
    def health_focus(self, value: Dict[str, str]):
        self.health_focus_json = json.dumps(value)

    @property
    def dietary_restrictions(self) -> List[str]:
        return json.loads(self.dietary_restrictions_json)

    @dietary_restrictions.setter
    def dietary_restrictions(self, value: List[str]):
        self.dietary_restrictions_json = json.dumps(value)

    @property
    def time_availability(self) -> Dict[str, Dict[str, str]]:
        return json.loads(self.time_availability_json)

    @time_availability.setter
    def time_availability(self, value: Dict[str, Dict[str, str]]):
        self.time_availability_json = json.dumps(value)

    @property
    def cultural_background(self) -> List[str]:
        return json.loads(self.cultural_background_json)

    @cultural_background.setter
    def cultural_background(self, value: List[str]):
        self.cultural_background_json = json.dumps(value)