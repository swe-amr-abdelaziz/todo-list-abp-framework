# TodoList

## About this solution

This is a layered startup solution based on [Domain Driven Design (DDD)](https://abp.io/docs/latest/framework/architecture/domain-driven-design) practices. It comes pre-configured with all essential ABP modules. For more information, see the [Application Startup Template](https://abp.io/docs/latest/solution-templates/layered-web-application).

## How to Run the Project

1. **Install ABP CLI globally**

   ```bash
   dotnet tool install -g Volo.Abp.Studio.Cli
   ```

2. **Install dependencies**

   ```bash
   abp install-libs
   ```

3. **Set up the database**

   - Make sure Docker is installed and running.
   - Start the database using Docker Compose (located in the root folder):

     ```bash
     docker-compose up -d
     ```

4. **Run migrations**

   - Option 1: Run `TodoList.DbMigrator` project in Visual Studio.
   - Option 2: Open a terminal in the `TodoList.DbMigrator` folder and run:

     ```bash
     dotnet run
     ```

5. **Start the backend server**

   - Option 1: Run `TodoList.HttpApi.Host` project in Visual Studio.
   - Option 2: Open a terminal in the `TodoList.HttpApi.Host` folder and run:

     ```bash
     dotnet run
     ```

6. **Start the Angular frontend**

   - Open a terminal in the `angular` project folder and run:

     ```bash
     npm start
     ```

7. **Open the application**

   - Open your browser at `http://localhost:4200`

## Any Setup Requirements

- ABP CLI:

  ```bash
  dotnet tool install -g Volo.Abp.Studio.Cli
  ```

- Client-side packages:

  ```bash
  abp install-libs
  ```

## What Has Been Completed

- Basic CRUD operations
- Input validations
- Marking todos as completed
- Status filter added to the list
- Bonus: Loading spinner applied for a better user experience

## Challenges Faced

- **Handling time zones**: syncing server-side timestamps with the local time on the client
- Managing multiple UI interactions and keeping todo state updates consistent across the interface
