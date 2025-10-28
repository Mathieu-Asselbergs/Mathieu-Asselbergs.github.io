#todo _Find appropriate ALTC slide deck to mention as a reference._
#todo _Put the definition in a callout._
#todo _Remove the picture and replace it by a diagram made in Mermaid._

### Definition
A deterministic finite automaton (DFA) is a state machine that has exactly one transition for every letter in its alphabet, on every one of its states. A DFA is described by a 5-tuple of values:
$$
D = (Q, \Sigma, \delta, q_0, F)
$$
where
$$
\begin{flalign}
  \hspace{10pt}
  
  & Q      &&\;\;
           &&\;\; \text{is the set of states for this machine,} &&\\
  
  & \Sigma &&\;\;
           &&\;\; \text{is the set of accepted input characters (the alphabet) of this machine,} &&\\
  
  & \delta &&\;\; \in (Q \times \Sigma) \rightarrow \mathcal{P}(Q)
           &&\;\; \text{is the transition function that maps state-letter pairs  to new states,} &&\\
  
  & q_0    &&\;\; \in Q
           &&\;\; \text{is the initial state of this machine, and} &&\\
  
  & F      &&\;\; \subseteq Q
           &&\;\; \text{is the set of final states for this machine.} &&
\end{flalign}
$$


### Computations
State machines can make computations based on input words $w \in \Sigma^*$ formed from letters in the alphabet of the machine. All such computations start in the initial configuration $(q_0, w)$ and progress by consuming characters in $w$.

Considering DFA $D = (Q, \Sigma, \delta, s_1, F)$ below and input word $w = 0110$, a description of the computation for $w$ would look like
$$
(s_1, 0110)
\vdash_D (s_1, 110)
\vdash_D (s_2, 10)
\vdash_D (s_4, 0)
\vdash_D (s_4, \varepsilon)
$$
or
$$
(s_1, 0110) \vdash_D^* (s4, \varepsilon)
$$
for short. If the machine in use is unambiguous, the subscript with its name can be omitted.

Configurations with the empty word $\varepsilon$ as remaining input word are called final configurations and computations leading to them are called complete computations.

![[Simple DFA.png]]


### Language of a DFA
Computations that lead to a final configuration in a state that is also in the list of final states $F$ are considered accepting computations. Those that lead to a final configuration in a state that is not in $F$ are rejecting computations. The set of all words that form the basis for an accepting computation on a machine is called the language of that machine. Formally, the language of a DFA $D$ is given by
$$
\mathcal{L}(D) = \{
  w \in \Sigma^*
  \; \; |\; \;
  \exists_q[
    q \in F
    :
    (q_0, w) \vdash_D^* (q, \varepsilon)
  ]
\}.
$$



# References
1. None...