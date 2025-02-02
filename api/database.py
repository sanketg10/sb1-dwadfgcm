from sqlmodel import SQLModel, create_engine, Session
from typing import Generator
import os

# Create the database directory if it doesn't exist
os.makedirs("api/data", exist_ok=True)

# Database configuration
database_path = "api/data/vital_bites.db"
DATABASE_URL = f"sqlite:///{database_path}"

# Create engine with connection pooling and logging
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},  # Needed for SQLite
    echo=True  # Enable SQL query logging
)

def create_db_and_tables():
    """Initialize the database and create all tables"""
    try:
        SQLModel.metadata.create_all(engine)
        print("Database and tables created successfully")
    except Exception as e:
        print(f"Error creating database and tables: {e}")
        raise

def get_session() -> Generator[Session, None, None]:
    """Get a database session"""
    with Session(engine) as session:
        try:
            yield session
        except Exception as e:
            print(f"Session error: {e}")
            session.rollback()
            raise
        finally:
            session.close()