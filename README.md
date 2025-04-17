# Inflektion
 
This project is part of the Frontend Engineering Assessment for Inflektion. It consists of a single-page Angular application that replicates a pixel-perfect, responsive Partner Portal page based on a provided Figma design.
 
## Features
 
- **Data Fetching:** Retrieves partner data dynamically from a mock API endpoint.
- **Table Display:** Renders partner information including name, type, conversions, commissions, gross sales, and contract type.
- **Pagination:** Shows 15 records per page with a clear navigation experience.
- **Responsive Design:** Optimized for both desktop and smaller screens with horizontal scroll support for tables.
- **Error Handling:** Displays user-friendly messages on API failure and handles missing or null data gracefully.
- **Styling:** Utilizes Tailwind CSS for a clean and modern UI, ensuring a consistent look and feel across the application.
- **Testing:** Includes unit tests for the main components using Karma and Jasmine.
 
## Technologies Used
 
- Angular CLI v19.2.7
- Tailwind CSS v4
- TypeScript
- Angular HTTPClient
 
## Error Handling
 
- If the API call fails, a friendly error message is displayed to the user.
- Missing fields such as `commissions` or `grosssales` are defaulted to `0` or `-` to prevent UI breaks.
 
## Live Demo and Repository
 
- GitHub Repository: https://github.com/jacobmind/partner-portal
- Live URL: https://inflektion.jacobmind.com/
  
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
