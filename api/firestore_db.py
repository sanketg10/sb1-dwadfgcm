import firebase_admin
from firebase_admin import credentials, firestore
import os
from datetime import datetime
from typing import Dict, List, Optional

# Initialize Firebase Admin
cred = credentials.Certificate(os.getenv('GOOGLE_APPLICATION_CREDENTIALS', 'service-account.json'))
firebase_admin.initialize_app(cred)

db = firestore.client()

class FirestoreDB:
    @staticmethod
    def user_ref(user_id: str):
        return db.collection('users').document(user_id)

    @staticmethod
    async def get_user(user_id: str) -> Optional[Dict]:
        doc = FirestoreDB.user_ref(user_id).get()
        return doc.to_dict() if doc.exists else None

    @staticmethod
    async def create_user(user_id: str, user_data: Dict):
        user_data['createdAt'] = datetime.utcnow()
        FirestoreDB.user_ref(user_id).set(user_data)

    @staticmethod
    async def update_user(user_id: str, user_data: Dict):
        FirestoreDB.user_ref(user_id).update(user_data)

    @staticmethod
    async def get_user_preferences(user_id: str) -> Optional[Dict]:
        doc = FirestoreDB.user_ref(user_id).collection('preferences').document('settings').get()
        return doc.to_dict() if doc.exists else None

    @staticmethod
    async def update_user_preferences(user_id: str, preferences: Dict):
        FirestoreDB.user_ref(user_id).collection('preferences').document('settings').set(
            preferences, merge=True
        )

    @staticmethod
    async def get_meal_plan(user_id: str) -> Optional[Dict]:
        doc = FirestoreDB.user_ref(user_id).collection('mealPlans').document('current').get()
        return doc.to_dict() if doc.exists else None

    @staticmethod
    async def save_meal_plan(user_id: str, meal_plan: Dict):
        FirestoreDB.user_ref(user_id).collection('mealPlans').document('current').set(
            {
                'plan': meal_plan,
                'updatedAt': datetime.utcnow()
            }
        )

    @staticmethod
    async def get_shopping_list(user_id: str) -> List[Dict]:
        docs = FirestoreDB.user_ref(user_id).collection('shoppingList').stream()
        return [doc.to_dict() | {'id': doc.id} for doc in docs]

    @staticmethod
    async def add_shopping_item(user_id: str, item: Dict) -> str:
        doc_ref = FirestoreDB.user_ref(user_id).collection('shoppingList').document()
        doc_ref.set(item | {'createdAt': datetime.utcnow()})
        return doc_ref.id

    @staticmethod
    async def update_shopping_item(user_id: str, item_id: str, item: Dict):
        FirestoreDB.user_ref(user_id).collection('shoppingList').document(item_id).update(
            item | {'updatedAt': datetime.utcnow()}
        )

    @staticmethod
    async def delete_shopping_item(user_id: str, item_id: str):
        FirestoreDB.user_ref(user_id).collection('shoppingList').document(item_id).delete()

    @staticmethod
    async def clear_shopping_list(user_id: str):
        docs = FirestoreDB.user_ref(user_id).collection('shoppingList').stream()
        for doc in docs:
            doc.reference.delete()