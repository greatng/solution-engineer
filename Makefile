all :
		docker compose up

stop:
		docker compose stop

down: 
		docker compose down

build:
		docker build ./be-app
		docker build ./fe-app