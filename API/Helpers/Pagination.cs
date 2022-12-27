namespace API.Helpers
{
    public class Pagination<T> where T : class
    {
        public Pagination(int pageIndex, int pageSiza, int count, IReadOnlyList<T> data)
        {
            this.pageIndex = pageIndex;
            this.pageSiza = pageSiza;
            this.count = count;
            Data = data;
        }

        public int pageIndex { get; set; }
        public int pageSiza { get; set; }
        public int count { get; set; }
        public IReadOnlyList<T> Data { get; set; }
    }
}
