### Documentation

#### Overview
The Fractional Knapsack API is designed to maximize the total value of selected chocolates from the database based on their value-to-weight ratio, ensuring the best combination fits within a given weight capacity. The algorithm allows partial selections when necessary to optimize the result.

---
#### Base URL
- **Base URL**: `https://tdp.thecodegrammer.net`

---

#### Chocolatelist API
- **Endpoint**: `GET /api/v1/chocolate-list`
- **Purpose**: Retrieve all available chocolates from the database.
- **Response**:
```json
{
    "status": "success",
    "message": "Chocolates retrieved successfully",
    "data": [
        {
            "id": 1,
            "name": "Dark Chocolate",
            "weight": 50.0,
            "value": 85.0,
            "ratio": 1.7,
            "image": "http://127.0.0.1:8000/media/chocolate/dark.webp"
        },
        ...
    ]
}
```

#### Knapsack API Details
- **Endpoint**: `POST /api/v1/chocolate/create`
- **Purpose**: Retrieve the optimal selection of chocolates given a specific capacity and a list of chocolate IDs.

##### Request Body
```json
{
    "capacity": 150,
    "chocolates": [1, 2, 3, 4, 5]
}
```
- `capacity`: The total weight capacity of the knapsack.
- `chocolates`: List of chocolate IDs to consider for selection.

##### Example Response
```json
{
    "status": "success",
    "message": "Chocolate retrieved successfully",
    "data": {
        "max_value": 295.0,
        "selected_items": [
            {
                "chocolate": {
                    "id": 4,
                    "order": 4,
                    "name": "Chocolate Truffles",
                    "weight": 60.0,
                    "value": 150.0,
                    "ratio": 2.5,
                    "image": "http://127.0.0.1:8000/media/chocolate/ctuffle.webp"
                },
                "weight": 60.0,
                "value": 150.0
            },
            {
                "chocolate": {
                    "id": 1,
                    "order": 1,
                    "name": "Dark Chocolate",
                    "weight": 50.0,
                    "value": 85.0,
                    "ratio": 1.7,
                    "image": "http://127.0.0.1:8000/media/chocolate/dark.webp"
                },
                "weight": 50.0,
                "value": 85.0
            },
            {
                "chocolate": {
                    "id": 5,
                    "order": 5,
                    "name": "Hazelnut Chocolate",
                    "weight": 80.0,
                    "value": 120.0,
                    "ratio": 1.5,
                    "image": "http://127.0.0.1:8000/media/chocolate/hazelnut.webp"
                },
                "weight": 40.0,
                "value": 60.0
            }
        ]
    }
}
```

---

#### Algorithm Details

##### Step 1: Input Analysis
The input includes:
- **Capacity**: Maximum weight the knapsack can carry.
- **Chocolates**: Each chocolate has:
  - `weight`
  - `value`
  - **Value-to-weight ratio** (calculated as `value / weight`).

##### Step 2: Sorting by Ratio
The algorithm sorts chocolates in descending order of their value-to-weight ratio to prioritize items that provide the most value per unit weight.

##### Step 3: Selecting Chocolates
1. Start with the chocolate with the highest ratio.
2. Add it fully if the remaining capacity allows.
3. If not, add a fractional amount to fill the remaining capacity.
4. Repeat until the capacity is exhausted.

##### Example Calculation
For input:
```json
{
    "capacity": 150,
    "chocolates": [1, 2, 3, 4, 5]
}
```
**Chocolates Details**:
```
ID | Name                  | Weight | Value | Ratio
---------------------------------------------------
 4 | Chocolate Truffles    |   60   |  150  |  2.5
 1 | Dark Chocolate        |   50   |   85  |  1.7
 5 | Hazelnut Chocolate    |   80   |  120  |  1.5
 2 | Milk Chocolate        |  100   |   75  |  0.75
 3 | White Chocolate       |  125   |   40  |  0.32
```

**Execution Steps**:
1. Add **Chocolate Truffles** (ID: 4): Full weight `60`, value `150`.
   - Remaining capacity: `150 - 60 = 90`
2. Add **Dark Chocolate** (ID: 1): Full weight `50`, value `85`.
   - Remaining capacity: `90 - 50 = 40`
3. Add Fractional **Hazelnut Chocolate** (ID: 5): Weight `40`, value \( \frac{40}{80} \times 120 = 60 \).
   - Remaining capacity: `0`.

**Total Value**: \( 150 + 85 + 60 = 295 \).

**Selected Chocolates**:
1. Chocolate Truffles: Full.
2. Dark Chocolate: Full.
3. Hazelnut Chocolate: Partial.

---

#### Additional Features
1. **Error Handling**:
   - Invalid capacity (negative or zero).
   - Non-integer or empty chocolate IDs.
   - Missing or invalid chocolates.
2. **Serialization**:
   - Selected chocolates include full metadata (ID, name, weight, value, ratio, image).

---

#### Conclusion
The Fractional Knapsack API optimally selects chocolates based on their value-to-weight ratio, providing an efficient and detailed response. It includes full chocolate metadata and supports fractional selections to maximize value within the provided capacity.
