sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=PasswordsR0ck!" \
   -p 1433:1433 --name sql1 --hostname sql1 \
   -d mcr.microsoft.com/mssql/server:2019-latest