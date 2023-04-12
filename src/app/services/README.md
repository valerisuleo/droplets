# HttpService Class

The `HttpService` class is a utility class designed to handle HTTP requests using the `axios` library. It provides CRUD methods (Create, Read, Update, Delete) for making API calls and handles error responses from the server.


## Methods

The `HttpService` constructor takes two parameters:

1. `url`: The base URL for the API requests.
2. `http`: An instance of the Axios class.


- `getAll(queryParams?: string): Promise<AxiosResponse>`
This method retrieves all resources from the API. It accepts an optional queryParams string, which can be used to filter the results or provide additional options.

- `post(payload: any): Promise<AxiosResponse>`
This method creates a new resource on the API by sending a POST request with the provided payload.

- `put(resource: any, key: string): Promise<AxiosResponse>`
This method updates an existing resource on the API by sending a PUT request with the provided resource object and the resource's key (unique identifier).

- `deleteItem(resource: any, key: string): Promise<AxiosResponse>`
This method deletes an existing resource on the API by sending a DELETE request with the provided resource object and the resource's key (unique identifier).

## Handling errors

- `errorsIntereptor(): void`
This private method sets up an Axios response interceptor to handle errors. It checks if the error is an expected error (status code between 400 and 499) and throws an appropriate error instance. For unexpected errors, it shows a toast notification with an error message.

- `handleError(error: AxiosError): AppError`
This private method takes an `AxiosError` object as a parameter and returns an appropriate error instance based on the error's status code. If the error status code is 404, it returns a `NotFoundError` instance. Otherwise, it returns a generic `AppError` instance.

## Usage

```
class MoviesService extends HttpService {
    constructor() {
        super(
            `${environment.config.api.express.baseUrl}/movies`,
            axios.create()
        );
    }
}

export const moviesService = new MoviesService();

```

In the given example, we demonstrate how to consume the `HttpService` class by creating a new class called `MoviesService` that extends it. This approach provides a number of **benefits**:

1. **Modularity**: By extending the HttpService class, you can create separate service classes for each resource type (e.g., movies, users, etc.). This promotes modularity and makes it easier to maintain and organize your code.

2. Code **Reusability**: The HttpService class provides generic CRUD methods for making API calls. By extending it, you can reuse these methods in your service classes without having to rewrite them for each resource type.

3. **Error Handling**: The HttpService class includes built-in error handling, which means you don't have to worry about implementing error handling for each service class that extends it.

4. **Centralized Configuration**: The MoviesService constructor takes the base URL for the API from the environment configuration file. This makes it easy to switch between different environments (e.g., development, staging, production) without having to modify each service class individually.


>Here's a brief **explanation** of the `MoviesService` example:
>
> 1. Import the necessary modules, including axios, HttpService, and the `environment` configuration object.
> 2. Create a new MoviesService class that extends the HttpService class.
> 3. In the MoviesService constructor, call the super() method with two arguments:
> 	- The API base URL for the movies resource, which is taken from the environment configuration object.
> 	- An instance of the axios library created using `axios.create()`.

> 4. Export a new instance of the `MoviesService` class as `moviesService`.

>This approach allows you to create a custom MoviesService class that inherits the CRUD methods and error handling provided by the HttpService class, while also making it easy to manage and configure the API base URL through the environment configuration object.




































