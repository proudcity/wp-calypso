docker build -t proudcity/wp-calypso .
docker run -e "CALYPSO_ENV=production" proudcity/wp-calypso
