import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Aboutus = () => {
  return (
    <div>

<center> <div className="container">
                {/* Brand Logo and Name */}
              <div className="navbar-brand  " to="/">
                    <br />
                    <h1 className="fw-bold text-primary">🌉Almabridge🌉</h1>
               
</div>
                </div> </center>



      {/* Introduction Section */}
      <div className="container py-5" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="mt-5 ">
        <h3 className="fw-bold mb-2">📖 Introduction</h3>
        <p className="lead text-center mb-3 ">
          Almabridge is a platform for juniors, seniors, and alumni to connect and share their valuable experiences online. We all need good guidance in our lives to achieve our goals. This guidance may come from parents, elders, or peer groups. But if we get it from our seniors who have recently experienced what we are going through now, it can truly help us.
        </p>
      </div>
      </div>

     

        {/* Image Section */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <img
              src="/outcomes.webp"
              alt="Almabridge Objectives"
              className="img-fluid rounded shadow"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>

         {/* Main Content Section */}
      <div className="container py-5" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ fontFamily: "-moz-initial" }}>
            🚀 Empowering Juniors, Recognizing Seniors
          </h1>
          <p className="lead">
            Through Almabridge, juniors can gain valuable insights from seniors, helping them make informed decisions about academics and careers while seniors are rewarded for their mentorship.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="row mt-5">
          {/* Benefits for Juniors */}
          <div className="col-md-6">
            <h3 className="fw-bold">🔹 Key Benefits for Juniors:</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                ✅ <strong>Project Insights:</strong> Learn what projects seniors worked on in their semesters.
              </li>
              <li className="list-group-item">
                ✅ <strong>Programming Guidance:</strong> Discover programming languages that helped seniors excel.
              </li>
              <li className="list-group-item">
                ✅ <strong>Industry Trends:</strong> Stay ahead with knowledge of what’s trending in the tech industry.
              </li>
              <li className="list-group-item">
                ✅ <strong>Course Recommendations:</strong> Get advice on the most important subjects and topics.
              </li>
              <li className="list-group-item">
                ✅ <strong>Career Growth:</strong> Shape your career path with guidance from experienced seniors.
              </li>
            </ul>
          </div>

          {/* Value for Seniors */}
          <div className="col-md-6">
            <h3 className="fw-bold">🎖 Value for Seniors:</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                💡 <strong>Mentorship Recognition:</strong> Gain recognition for guiding juniors.
              </li>
              <li className="list-group-item">
                💰 <strong>Incentives & Rewards:</strong> Earn payouts for sharing knowledge and experiences.
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="row mt-5">
          <div className="col-md-12">
            <h3 className="fw-bold">🌟 Why Choose Almabridge?</h3>
            <p className="lead">
              Almabridge is more than just a platform; it’s a community where knowledge flows seamlessly between generations. Here’s why you should join us:
            </p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                🌐 <strong>Global Network:</strong> Connect with alumni and seniors from around the world.
              </li>
              <li className="list-group-item">
                📚 <strong>Resource Library:</strong> Access a curated library of resources shared by seniors.
              </li>
              <li className="list-group-item">
                🛠️ <strong>Practical Advice:</strong> Get actionable advice tailored to your academic and career goals.
              </li>
              <li className="list-group-item">
                🤝 <strong>Community Support:</strong> Be part of a supportive community that values growth and learning.
              </li>
              <li className="list-group-item">
                🏆 <strong>Recognition:</strong> Seniors are recognized and rewarded for their contributions.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;