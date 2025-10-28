Following the notion captured in the work on [[Minimal Valuable Units]], this work considers implementations of MVU processing code in the Rust programming language, possibly as a zero-cost abstraction.

### The concept of a minimally progressing iterator (MPI)
Programs that lazily generate standalone pieces of data are called iterators. I coin the term minimally progressing iterator (MPI) for those programs that lazily generate minimal valuable units (MVUs) of data.

The idea of such an MPI is to work as quickly as possible with only exactly the data that it needs. Such programs would lend themselves especially well to continuously observable behavior at any scale.

### Parallelization and asynchronous execution
In case several constituent MPIs in a larger MPI have independent work, their work may be completed asynchronously or in parallel. The callback for the high-level MPI may then depend on the collection of callbacks from the lower-level MPIs, leading to an MPI that automatically advances as much as it can, whenever it can, and which performs its work on multiple threads/processors to complete it as quickly as possible.



---
## Thoughts So Far
- Many data processing and real-time programs can be rewritten as MPIs, making them easy to debug.
- A potential downside could be that this approach is needlessly slow for computations that benefit from spacial or temporal locality. Consider matrix multiplication and some expensive operation on the elements of the result of this multiplication. The multiplication and operation both benefit from locality, but their MVU implementation breaks locality on purpose. How could this be mitigated?
- This concept may be easily implemented with nested iterator structures. That is structures that implement the `Iterator` trait, composed (partly) of iterators.