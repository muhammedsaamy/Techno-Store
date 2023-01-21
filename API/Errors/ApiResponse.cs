namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            this.statusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public int statusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A bad requset, you have made",
                401 => "Authorized, you are not",
                404 => "Resource found, it are not",
                500 => "Error are the path to the dark side, Errors lead to anger. Anger leads to hate. Hate leads to career change",
                _ => null
            };
        }
    }
}
