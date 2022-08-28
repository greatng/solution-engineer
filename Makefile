all :
		docker compose up

build:
		docker build ./be-app
		docker build ./fe-app