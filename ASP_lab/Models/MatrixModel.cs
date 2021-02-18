using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASP_lab.Models
{
    public class MatrixModel
    {
        public double[][] matrix;
        public double max;
        public double max1;
        public double max2;
        public MatrixModel(double[][] matrix, double max, double max1, double max2)
        {
            this.matrix = matrix;
            this.max = max;
            this.max1 = max1;
            this.max2 = max2;
        }
    }
}
