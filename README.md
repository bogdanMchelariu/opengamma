# OpenGamma Web Development Coding Test

Thanks for applying to OpenGamma. This coding test usually takes 1-2 hours and is designed to test your understanding of Javascript, Angular and RxJs. The challenges below closely reflect pieces of workflow that the members of our UI team face every day.

We'd recommend familiarising yourself with the [RxJS API](https://www.learnrxjs.io/) before beginning this task.

Feel free to add files and/or make changes to any files not marked with `DO NOT MODIFY THIS FILE`. This includes config files.

If you have any questions or queries about this coding test or your application in general, please email [webdevelopment@opengamma.com](mailto:webdevelopment@opengamma.com).
 
## Your Task

Our client requested an aggregated view across multiple price calculations that our systems run daily. The design team has produced an initial prototype that solves this. Your task is to implement this prototype (API integration, Data representation, User feedback) for early validation with the business side.

The exercise is formed of 3 parts, all of which can be completed individually. When struggling with one part feel free to attempt solving the rest.

### Part 1 - API Integration and Polling

Our [API](https://docs.opengamma.com) contains endpoints for:
 - asynchronously creating calculations
 - receiving the results of previously created calculations. 
 
The calculations can take varying lengths of time, so we've adopted a polling API with which a user submits a request and then polls an endpoint until the result is present.

An example sequence of requests might look like the following, where each call is made 2 seconds after the previous one.
```
POST /calculations -> id
GET /calculations/id -> PENDING
GET /calculations/id -> PENDING
GET /calculations/id -> PENDING
GET /calculations/id -> SUCCESS with value 123.45
```

This API is modelled (somewhat crudely) in the `data.service.ts` file. A calculation takes between 2.5-10 seconds once the request has been submitted.

Your first task is to implement the polling behaviour described above. This should be implemented in the `calculation.service.ts` file, inside the `calculate` method.

##### Requirements
- The method should submit a calculation via the calculation service, then periodically request a result until one becomes available.
- The method should then return an `Observable` which will emit once with the result `value` when the endpoint returns a result `status` of `SUCCESS`.

##### Indications
- Each request should be treated as an expensive network call, hence the frequency of the API calls should be carefully considered.
- Observable subscriptions are discouraged.

### Part 2 - Data Representation

As the calculated values are aggregated inside `app.component.ts`, they should be displayed to the user. The data structure returned in the API is defined in the `ImGrouping` interface in `result.model.ts`

Your second task is to create a table that displays the data, following the design under `assets/table-loaded.png`.

![Results Table](/src/assets/table-loaded.png)

##### Requirements
- The table should act as a 2-level tree, with each row offering the possibility to be expanded on click, provided it has any children. Once expanded, it should display its children as rows directly underneath. See `assets/table-expanded.png` for reference.

![Table Expanded](/src/assets/table-expanded.png)

- The last column in the table should display a visual representation of the imValues of each row, compared to the maximum imValue in the table. Thus, one bar (the maximum) will be at 100%, while the others should be scaled accordingly. The bars should rescale if the maximum value in the table changes.

#### Extension - Improving UX by providing User Feedback

The progress of the calculations polling mechanism is depicted by the the `progress-bar` component.

Considering that the calculations could take a long time, the progress bar will be stuck at 0% for multiple seconds. This might incorrectly suggest that the page has frozen and needs refreshing.

An improvement would be to have the progress bar approximate the duration of the calculations. The bar would begin filling gradually when a request has been submitted and continue whilst the result is pending.
 
Modify the progress bar component to implement this behaviour.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
