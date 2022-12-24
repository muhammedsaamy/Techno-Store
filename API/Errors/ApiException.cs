namespace API.Errors
{
    public class ApiException : ApiResponse
    {
        public ApiException(int statusCode, string message = null, string details=null) : base(statusCode, message)
        {
            Deteils = details;
        }

        public string Deteils { get; set; }
    }
}
