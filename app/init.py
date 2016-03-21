# ............................................................................................... #

from sqlalchemy import *
import datetime
import hashlib
from sqlalchemy.ext.automap import automap_base

# ............................................................................................... #        

SALT = 'foo#BAR_{baz}^666'              

engine = create_engine('sqlite:///concert.db', echo=False)
metadata = MetaData(engine)

users = Table('users', metadata,
	Column('id', Integer, primary_key=True),
	Column('login', String, nullable=False),
	Column('nom', String),
	Column('prenom', String),
	Column('mail', String),
	Column('password_hash', String, nullable=False),
	Column('date_naissance', Integer),
	Column('telephone', String),
	Column('Taste', Integer),		
	sqlite_autoincrement=True)    

events = Table('events', metadata,
	Column('id', Integer, primary_key=True),
	Column('name', String, nullable=False),
	Column('description', String),
	Column('date', Date),
	Column('img',String, nullable=False),
	Column('salle', Integer, ForeignKey('salles.id')),
	sqlite_autoincrement=True)

salles = Table('salles', metadata,
	Column('id', Integer, primary_key=True),
	Column('name', String, nullable=False),
	Column('link',String,nullable=False),
	Column('plan',String, nullable=False),
	Column('c1',String, nullable=False),
	Column('c2',String, nullable=True),
	Column('c3',String, nullable=True),
	Column('n1',Integer, nullable=False),
	Column('n2',Integer, nullable=True),
	Column('n3',Integer, nullable=True),
	Column('nb_places', Integer, nullable=False),
	sqlite_autoincrement=True)
	
reservations = Table('reservations', metadata,
	Column('id', Integer, primary_key=True),
	Column('id_Event', Integer, ForeignKey('events.id')),
	Column('id_User', Integer, ForeignKey('users.id')),
	Column('id_Cat', String, nullable=False), 
	Column('Social', Integer, nullable=False),
	Column('places_reserves', Integer, nullable=False),
	Column('user_meet',Integer, ForeignKey('users.id')),
	sqlite_autoincrement=True)

metadata.create_all(engine)

def hashFor(password):
    salted = '%s @ %s' % (SALT, password)
    return hashlib.sha256(salted).hexdigest()   

db = engine.connect();
db.execute(users.insert().values(login='admin', password_hash=hashFor('admin')))
db.execute(users.insert().values(login='aaa', password_hash=hashFor('aaa')))
db.execute(salles.insert().values(name='Theatre Royal Wakefield', link='http://www.theatreroyalwakefield.co.uk',plan='/static/img/plan1.gif', c1='Stalls', c2='Dress Circle', c3='Upper Circle', n1=200, n2=150, n3=100, nb_places=450))
db.execute(salles.insert().values(name='Zenith de Paris', link='http://www.zenith-paris.com',plan='/static/img/plan3.jpg', c1='Floor', c2='Bench', n1=400, n2=200, nb_places=600))
db.execute(salles.insert().values(name='Barnfield Theatre', link='http://www.barnfieldtheatre.org.uk/',plan='/static/img/plan2.jpg', c1='Unique Category', n1=300, nb_places=300))
db.execute(events.insert().values(name='Hearscape',description='Hearscape is cool but unknown', img='/static/img/hearscape.png',date=datetime.date(2015, 06, 21),salle=1))
db.execute(events.insert().values(name='Rolling Stones',description='The Rolling Stones are one of the biggest Rock Band ever',img='/static/img/stones.jpg',date = datetime.date(2015,07,23),salle=3))
db.execute(events.insert().values(name='Archive',description='Archive is an English trip-hop and progressive rock band very appreciated in France',img='/static/img/archive.jpg',date = datetime.date(2015,8,11),salle=3))
db.execute(events.insert().values(name='Slash',description='Slash has many hair and a beautiful guitar',img='/static/img/slash.jpg',date = datetime.date(2015,11,12),salle=2))
db.execute(events.insert().values(name='Susan Boyle',description='Susan has eaten many things in her life',img='/static/img/boyle.jpg',date = datetime.date(2015,10,15),salle=1))
db.execute(events.insert().values(name='Patrick Sebastien',description='Patrick Sebastien is a funny french guy',img='/static/img/sebastien.jpg',date = datetime.date(2015,12,25),salle=2))
db.close()
