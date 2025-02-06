from sqlmodel import SQLModel, create_engine, Session
from typing import Generator
import os

# Database configuration
DB_USER = os.getenv("DB_USER", "vital_bites_user")
DB_PASS = os.getenv("DB_PASS", "")
DB_NAME = os.getenv("DB_NAME", "vital_bites")
DB_HOST = os.getenv("DB_HOST", "")

# For Cloud SQL with Unix socket
INSTANCE_UNIX_SOCKET = os.getenv("DB_HOST", "")

if INSTANCE_UNIX_SOCKET:
    DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASS}@/{DB_NAME}?host={DB_HOST}"
else:
    # Local development fallback
    DATABASE_URL = "sqlite:///./vital_bites.db"

# Create engine with connection pooling
engine = create_engine(
    DATABASE_URL,
    pool_size=5,
    max_overflow=2,
    pool_timeout=30,
    pool_recycle=1800,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
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