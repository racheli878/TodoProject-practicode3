# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY TodoApi.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish TodoApi.csproj -c Release -o /app --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app ./

ENV ASPNETCORE_ENVIRONMENT=Production
USER $APP_UID
EXPOSE 8080

# Cloud hosts such as Render pass the port in $PORT; default to 8080 elsewhere.
CMD ["sh", "-c", "ASPNETCORE_HTTP_PORTS=${PORT:-8080} exec dotnet TodoApi.dll"]
