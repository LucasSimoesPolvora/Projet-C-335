using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReadME.Classes
{
    public class ApiResult
    {
        public string message { get; set; }

        public List<Books> data { get; set; }
    }
}
