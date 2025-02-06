from datetime import datetime
from typing import List, Optional
from sqlmodel import SQLModel, Field, JSON
from pydantic import EmailStr
import json

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    name: str

class UserCreate(UserBase):
    password: str
    email: EmailStr

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class RecipeBase(SQLModel):
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

class RecipeCreate(RecipeBase):
    pass

class Recipe(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    image: str
    prep_time: str
    servings: int
    difficulty: str
    ayurvedic: str
    tags: str = Field(sa_type=JSON, default='[]')
    ingredients: str = Field(sa_type=JSON, default='[]')
    instructions: str = Field(sa_type=JSON, default='[]')
    calories: int
    protein: int
    carbs: int
    fat: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")

    def __init__(self, **data):
        # Convert list fields to JSON strings for database storage
        for field in ['tags', 'ingredients', 'instructions']:
            if field in data and isinstance(data[field], list):
                data[field] = json.dumps(data[field])
        super().__init__(**data)

    @property
    def tags_list(self) -> List[str]:
        return json.loads(self.tags)

    @property
    def ingredients_list(self) -> List[str]:
        return json.loads(self.ingredients)

    @property
    def instructions_list(self) -> List[str]:
        return json.loads(self.instructions)

class RecipeRead(RecipeBase):
    id: int
    created_at: datetime
    user_id: Optional[int]

class UserPreferences(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    targets: str = Field(sa_type=JSON, default='{}')
    health_focus: str = Field(sa_type=JSON, default='{}')
    dietary_restrictions: str = Field(sa_type=JSON, default='[]')
    time_availability: str = Field(sa_type=JSON, default='{}')
    about: str = Field(default="")
    favorite_foods: str = Field(default="")
    sample_meal_plan: str = Field(default="")
    social_media_favorites: str = Field(default="")
    familiarity_level: int = Field(default=50)
    cultural_background: str = Field(sa_type=JSON, default='[]')

    def __init__(self, **data):
        # Convert dict/list fields to JSON strings for database storage
        for field in ['targets', 'health_focus', 'dietary_restrictions', 'time_availability', 'cultural_background']:
            if field in data:
                if isinstance(data[field], (dict, list)):
                    data[field] = json.dumps(data[field])
        super().__init__(**data)

    @property
    def targets_dict(self) -> dict:
        return json.loads(self.targets)

    @property
    def health_focus_dict(self) -> dict:
        return json.loads(self.health_focus)

    @property
    def dietary_restrictions_list(self) -> List[str]:
        return json.loads(self.dietary_restrictions)

    @property
    def time_availability_dict(self) -> dict:
        return json.loads(self.time_availability)

    @property
    def cultural_background_list(self) -> List[str]:
        return json.loads(self.cultural_background)