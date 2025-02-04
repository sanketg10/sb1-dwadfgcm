from sqlmodel import SQLModel, create_engine, Session
from typing import Generator
import os

# Get the absolute path to the project root directory
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Create the database directory if it doesn't exist
DB_DIR = os.path.join(PROJECT_ROOT, "data")
os.makedirs(DB_DIR, exist_ok=True)

# Database configuration
database_path = os.path.join(DB_DIR, "vital_bites.db")
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
        print(f"Creating database at: {database_path}")
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