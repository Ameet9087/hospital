import React from 'react';

import './Section.css'

const Section = () => {
  return (
    <div className='outerSection'>
      <nav className="navbar">

        <div className="navText">
          <div className='navLogoOne'></div>
          <span>HIMS Health</span>
        </div>

        <button className="btnOne">
          <span>Home</span>
        </button>
      </nav>


      <main className="main-section">



        <aside className="aside-section left-aside">

          <div className='outOutDiv'>
            <div className='outDiv'>
              <div className='divOne'>
                <div className='logoOne'></div>
                <button className='btnIpd'>IPD</button>
              </div>
              <span className='textName'>JOSEPH GATHANGA</span><br></br>
              <span className='ageGen'>16 Y/ Male</span>
            </div>

            <hr></hr>
            <div className='divTwoDetails'>

              <span className='detailHeading'>Hospital No:</span>
              <span> 2406003766</span><br></br>
              <div className='ward'>

                <span className='detailHeading'>Ward/Bed:</span>
                <span> Private Ward/09</span><br></br>
              </div>
              <div className='attending'>

                <span className='detailHeading'>Attending:</span>
                <span>  Mrs.BRENDA MWANIA WANJIRU</span>
              </div>



            </div>
          </div>
          <div className='detailsBox'>
            <div className='boxOne'>
              <div className='textAndLogo'>

                <span className='textOne'>OPD Summary</span></div>

            </div>

            <div className='boxOne'>
              <div className='textAndLogo'>

                <span className='textOne'>Patient Overview</span></div>

            </div>



            <div className='boxOne'>
              <div className='textAndLogo'>

                <span className='textOne'>Problems</span></div>

            </div>

            <div className='boxOne'>
              <div className='textAndLogo'>

                <span className='textOne'>Current Medications</span></div>

            </div>

            <div className='boxOne'>
              <div className='textAndLogo'>

                <span className='textOne'>Encounter History</span></div>

            </div>

            <div className='boxOne'>
              <div className='textAndLogo'>

                <span className='textOne'>Orders</span></div>

            </div>

            <div className='boxOne'>
              <div className='textAndLogo'>

                <span className='textOne'>Clinical Documents</span></div>

            </div>

            <div className='boxOne'>
              <div className='textAndLogo'>

                <span className='textOne'>Clinical</span></div>

            </div>

            <div className='boxOne'>
              <div className='textAndLogo'>

                <span className='textOne'>Notes</span></div>

            </div>

            <div className='boxOne'>
              <div className='textAndLogo'>

                <span className='textOne'>Scanned images</span></div>

            </div>
          </div>
        </aside>

        <div className='betweenSection'>


          <div className='outOutDiv'>
            <div className='firstBox'>
              <div className='subNav'>
                <div className='labAndImg'>
                  <span className='spanText'>Labs</span>
                </div>
                <button className='btnAdd'>Add</button>
              </div>
              <div className='inputSection'>
                <input className='inputOne' placeholder='No Record Found'></input>
              </div>
            </div>
          </div>

          <div className='outOutDiv'>
            <div className='firstBox'>
              <div className='subNav'>
                <div>

                  <span className='spanText'>Imaging</span>
                </div>
                <button className='btnAdd'>Add</button>
              </div>
              <div>

                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Item</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>MRI</td>
                      <td>Brain</td>
                      <td> 2024-09-03 01:20PM</td>
                      <td>active</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className='outOutDiv'>
            <div className='firstBox'>
              <div className='subNav'>
                <div>
                  <span className='spanText'>Active Problems</span>
                </div>
                <button className='btnAdd'>Add</button>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Problem</th>
                      <th>Onset</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Intestinal infection due to Shigella</td>
                      <td>2024-09-05</td>
                      <td> <a href=''>Add Note</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>


          <div className='outOutDiv'>
            <div className='firstBox'>
              <div className='subNav'>
                <div>

                  <span className='spanText'>Medications</span>
                </div>
                <button className='btnAdd'>Add</button>
              </div>
              <div>

                <table>

                  <tbody>
                    <tr>
                      <td>OSMOLAX</td>
                      <td>0 times a day</td>
                      <td>Start Date- 04.04.2024</td>

                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>



        <aside className="aside-section right-aside">
          <div className='asideDivTwo'>
            <div className='asideNav'>
              <div className='navTextandBtn'>
                <div className='navVitals'>
                  <span className='spanText'>Last Vitals</span>
                  <div className='twoBtns'>
                    <button className='oneBtnNormal'>Show Graph</button>
                    <button className='secBtnBlue'>Add Vitals</button>
                  </div>
                </div>
                <div className='tableRecord'>

                  <table>
                    <tr>
                      <td>Recoreded On</td>
                      <td>2024-06-18 03:22 PM</td>
                    </tr>
                    <tr>
                      <td>Height</td>
                      <td>200 cm</td>

                    </tr>
                    <tr>
                      <td>Weight</td>
                      <td>40kg</td>

                    </tr>
                    <tr>
                      <td>BMI</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Temprature</td>
                    </tr>
                    <tr>
                      <td>Pulse</td>
                    </tr>
                    <tr>
                      <td>Blood Pressure</td>
                    </tr>
                    <tr>
                      <td>Respiratory Rate</td>
                    </tr>
                    <tr>
                      <td>SpO2</td>
                    </tr>
                    <tr>
                      <td>O2 Deliver Method</td>
                    </tr>
                    <tr>
                      <td>Body Pain Data</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div className=''>
              <div className='cheifComplaints'>
                <div className='navComplaints'>

                <div className='contentNav'>
                  <span className='spanText'>Cheif Complaints</span>
                  <button className='btnComplaints'>New Complaints</button>

                </div>



                <div className='inputSecTwo'>
                  <input className='inputTwo' placeholder='  No Record Found'></input>
                </div>
                </div>

              </div>

            </div>
          </div>


        </aside>

      </main>
    </div>

  );
};

export default Section;