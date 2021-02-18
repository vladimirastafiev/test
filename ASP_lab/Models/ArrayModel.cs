using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASP_lab.Models
{
    public class ArrayModel
    {
        public int[] array;
        public List<int> indexes;
        public ArrayModel(int[] array, List<int> indexes)
        {
            this.array = array;
            this.indexes = indexes;
        }
    }
}
