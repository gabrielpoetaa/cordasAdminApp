package routes

import (
	"api/src/controllers"
	"net/http"
)

var studentsRoutes = []Route{
	{
		Uri:    "/students",
		Method: http.MethodPost,
		Function: controllers.CreateStudent, 
		RequireAuth: false,
	},
	{
		Uri:    "/students",
		Method: http.MethodGet,
		Function: controllers.SearchStudents, 
		RequireAuth: false,
	},
	{
		Uri:    "/students/{studentId}",
		Method: http.MethodGet,
		Function: controllers.SearchStudent, 
		RequireAuth: false,
	},
	{
		Uri:    "/students/{studentId}",
		Method: http.MethodPut,
		Function: controllers.UpdateStudent, 
		RequireAuth: false,
	},
	{
		Uri:    "/students/{studentId}",
		Method: http.MethodDelete,
		Function: controllers.DeleteStudent, 
		RequireAuth: false,
	},
}