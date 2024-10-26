const PORT = 8001;
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/weight/:weightValue/reps/:noReps', (req, res) => {
    console.log(req.params);
    const weightValue = req.params.weightValue;
    const noReps = req.params.noReps;
    const nscaChart = {
        1: 1.00,
        2: 0.95,
        3: 0.93,
        4: 0.90,
        5: 0.87,
        6: 0.85,
        7: 0.83,
        8: 0.80,
        9: 0.77,
        10: 0.75,
        11: 0.72,
        12: 0.70,
    };

    var maxRepWeight = weightValue*36/(37-noReps);

    for (const reps in nscaChart) {
        nscaChart[reps] *= maxRepWeight;
    }

    console.log(req.params);
    //res.json({ maxRepWeight: maxRepWeight});
    res.json({ maxRepWeight: maxRepWeight, repPercentages: nscaChart });
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}   );

