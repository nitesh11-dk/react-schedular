Let's walk through the solution for each of the questions, providing detailed steps, reasoning, and how to compute the values:

---

### **Q1: Does the medication affect intelligence?**

#### **Given Data:**
- Population mean (μ) = 100
- Population standard deviation (σ) = 15
- Sample size (n) = 30
- Sample mean (x̄) = 140
- Significance level (α) = 0.05 (assumed for two-tailed test)

#### **Steps:**

1. **State the Hypotheses**:
   - Null Hypothesis (H₀): The medication does not affect intelligence, so the mean IQ remains 100 (μ = 100).
   - Alternative Hypothesis (H₁): The medication affects intelligence, so the mean IQ is different from 100 (μ ≠ 100).

2. **Choose the appropriate test**:
   - Since we know the population standard deviation, we use a **Z-test** for hypothesis testing.

3. **Compute the Z-score** using the formula:
   \[
   Z = \frac{x̄ - μ}{\frac{σ}{\sqrt{n}}}
   \]
   Where:
   - \( x̄ \) is the sample mean (140),
   - \( μ \) is the population mean (100),
   - \( σ \) is the population standard deviation (15),
   - \( n \) is the sample size (30).

4. **Calculate the Z-score**:
   Substituting the given values:
   \[
   Z = \frac{140 - 100}{\frac{15}{\sqrt{30}}} = \frac{40}{2.7386} = 14.61
   \]
   
5. **Determine the critical value**:
   - For a two-tailed test with α = 0.05, the critical Z-value is ±1.96.

6. **Decision**:
   - Compare the computed Z-score with the critical Z-value.
   - If \( |Z| > 1.96 \), reject the null hypothesis.
   - Since 14.61 > 1.96, we reject the null hypothesis.
   
7. **Conclusion**: The medication has a significant effect on intelligence, as the Z-score (14.61) is greater than the critical value (1.96).

---

### **Q2: Does the professor have 90% confidence that the mean score is above 70?**

#### **Given Data:**
- Sample scores = [62, 92, 75, 68, 83, 95]
- Sample size (n) = 6
- Population mean to test (μ) = 70
- Significance level (α) = 0.10 (for 90% confidence)

#### **Steps:**

1. **State the Hypotheses**:
   - Null Hypothesis (H₀): The class’s mean score is not above 70 (μ ≤ 70).
   - Alternative Hypothesis (H₁): The class’s mean score is above 70 (μ > 70).

2. **Choose the appropriate test**:
   - Since the sample size is small (n = 6), we use the **t-test** for hypothesis testing (not Z-test).

3. **Compute the sample mean and sample standard deviation**:
   - Mean (\( x̄ \)) = \( \frac{62 + 92 + 75 + 68 + 83 + 95}{6} = 79.17 \)
   - Standard deviation (s) = \( 13.17 \) (calculated using the formula for sample standard deviation).

4. **Compute the t-score** using the formula:
   \[
   t = \frac{x̄ - μ}{\frac{s}{\sqrt{n}}}
   \]
   Where:
   - \( x̄ \) = 79.17,
   - \( μ \) = 70,
   - \( s \) = 13.17,
   - \( n \) = 6.

   \[
   t = \frac{79.17 - 70}{\frac{13.17}{\sqrt{6}}} = \frac{9.17}{5.37} = 1.71
   \]

5. **Determine the critical t-value**:
   - For a one-tailed test with df = 5 (degrees of freedom = n - 1), and α = 0.10, the critical t-value (from a t-distribution table) is 1.475.

6. **Decision**:
   - If the t-score > critical t-value, reject the null hypothesis.
   - Since 1.71 > 1.475, we reject the null hypothesis.

7. **Conclusion**: The professor can be 90% confident that the class’s average score is above 70.

---

### **Q3: Do cars get better mileage with premium gas?**

#### **Given Data:**
- Regular gas mileage = [16, 20, 21, 22, 23, 22, 27, 25, 27, 28]
- Premium gas mileage = [19, 22, 24, 24, 25, 25, 26, 26, 28, 32]

#### **Steps:**

1. **State the Hypotheses**:
   - Null Hypothesis (H₀): No difference in mileage between premium and regular gas (μ₁ = μ₂).
   - Alternative Hypothesis (H₁): Premium gas gives better mileage than regular gas (μ₂ > μ₁).

2. **Use a Paired t-test**:
   - Since the same cars are tested with both types of gas, we perform a **paired t-test**.

3. **Compute the differences (d)**:
   \[
   d = \text{Premium mileage} - \text{Regular mileage}
   \]
   The differences for each car are calculated as follows:
   \[
   d = [3, 2, 3, 2, 2, 3, -1, 1, 1, 4]
   \]

4. **Compute the mean and standard deviation of the differences**:
   - Mean difference (\( \overline{d} \)) = 2.0
   - Standard deviation of differences = 1.41

5. **Compute the t-score** using the formula:
   \[
   t = \frac{\overline{d}}{\frac{s_d}{\sqrt{n}}}
   \]
   Where:
   - \( \overline{d} \) = 2.0,
   - \( s_d \) = 1.41,
   - \( n \) = 10.

   \[
   t = \frac{2.0}{\frac{1.41}{\sqrt{10}}} = \frac{2.0}{0.445} = 4.47
   \]

6. **Determine the critical t-value**:
   - For a one-tailed test with df = 9 (degrees of freedom = n - 1), and α = 0.05, the critical t-value is 1.83 (from a t-distribution table).

7. **Decision**:
   - Since the t-score (4.47) is greater than the critical t-value (1.83), we reject the null hypothesis.

8. **Conclusion**: Cars get significantly better mileage with premium gas.

---

### **Q4: Does the cutting machine deviate from 1200 mm?**

#### **Given Data:**
- Population mean (μ) = 1200 mm
- Population standard deviation (σ) = 3 mm
- Sample size (n) = 16
- Sample values = [1193, 1196, 1198, 1195, 1198, 1199, 1204, 1193, 1203, 1201, 1196, 1200, 1191, 1196, 1198, 1191]

#### **Steps:**

1. **State the Hypotheses**:
   - Null Hypothesis (H₀): The machine is correctly set to 1200 mm (μ = 1200).
   - Alternative Hypothesis (H₁): The machine deviates from 1200 mm (μ ≠ 1200).

2. **Choose the appropriate test**:
   - We use a **Z-test** since the population standard deviation is known.

3. **Compute the sample mean**:
   \[
   \overline{x} = \frac{1193 + 1196 + ... + 1191}{16} = 1197.625
   \]

4. **Compute the Z-score** using the formula:
   \[
   Z = \frac{\overline{x} - μ}{\frac{σ}{\sqrt{n}}}
   \]
   Where:
   - \( \overline{x} \) = 1197.625,
   - \( μ \) = 1200,
   - \( σ \) = 3,
   - \( n \) = 16.

   \[
   Z = \frac{1197.625 - 1200}{\frac{3}{\sqrt{16}}} = \frac{-2.375}{0.75} = -3.17
   \]

5. **Determine the critical Z-value**:
   - For a two-tailed test with α = 0.05, the critical Z-value is ±1.96.

6. **Decision**:
   - Since the Z-score (-3.17) is less than -1.96 (the critical value), we reject the null hypothesis.

7. **Conclusion**: The machine has significantly

 deviated from the expected 1200 mm.

---

This is the full solution with reasoning for each question. Let me know if you need more clarifications!
