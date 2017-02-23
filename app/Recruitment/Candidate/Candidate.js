"use strict";
var Candidate = (function () {
    function Candidate(id, email, name, phone, experience, skill, Reg_date, cosultancy, Score, Status, resume, logikScore) {
        this.ID = id;
        this.Name = name;
        this.Email = email;
        this.Phone = phone;
        this.Experience = experience;
        this.Skill = skill;
        this.Registration_date = Reg_date;
        this.Consultancy = cosultancy;
        this.Score = Score;
        this.Status = status;
        this.Resume = resume;
        this.LogikScore = logikScore;
    }
    return Candidate;
}());
exports.Candidate = Candidate;
//# sourceMappingURL=Candidate.js.map