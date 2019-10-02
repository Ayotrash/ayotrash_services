// SUCCESSS RESPONSE - 2XX
exports.success_OK = (message, data) => ({
	statusCode: 200,
	error: false,
	message: message,
	data: data
})

exports.success_created = (message, data) => ({
	statusCode: 201,
	error: false,
	message: message,
	data: data
})

exports.success_accepted = (message, data) => ({
	statusCode: 202,
	error: false,
	message: message,
	data: data
})

exports.success_no_content = (message, data) => ({
	statusCode: 204,
	error: false,
	message: message,
	data: data
})

// CLIENT ERROR RESPONSE - 4XX
exports.client_error_bad_request = (message) => ({
	statusCode: 400,
	error: true,
	message: message
})

exports.client_error_unauthorized = (message) => ({
	statusCode: 401,
	error: true,
	message: message
})

exports.client_error_forbidden = (message) => ({
	statusCode: 403,
	error: true,
	message: message
})

exports.client_error_not_found = (message) => ({
	statusCode: 404,
	error: true,
	message: message
})

exports.client_error_not_allowed = (message) => ({
	statusCode: 405,
	error: true,
	message: message
})

exports.client_error_not_acceptable = (message) => ({
	statusCode: 406,
	error: true,
	message: message
})

// SERVER ERROR RESPONSE - 5XX
exports.server_error_internal = (message) => ({
	statusCode: 500,
	error: true,
	message: message
})

exports.server_error_not_implemented = (message) => ({
	statusCode: 501,
	error: true,
	message: message
})