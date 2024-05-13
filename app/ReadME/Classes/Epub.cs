using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReadME.Classes
{
    public class Books
    {
        public int id_book { get; set; }

        public string booTitle { get; set; }

        public int booPageCount { get; set; }

        public string booExcerpt { get; set; }

        public string booSummary {  get; set; }

        public float booAvgRating { get; set; }

        public string booCoverImage { get; set; }

        public DateTime booPublishDate { get; set; }

        public string booEpub { get; set; }

        public string booAuthor { get; set; }
    }
}
