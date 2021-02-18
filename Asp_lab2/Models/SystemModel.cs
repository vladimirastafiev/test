using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asp_lab2.Models
{
    public class SystemModel
    {
        public int in_number;
        public int in_system;
        public SystemModel(int in_number, int in_system)
        {
            this.in_number = in_number;
            this.in_system = in_system;
        }
    }
}
