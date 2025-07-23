import React from 'react'
import "./EMRHistory.css"
const EMRHistory = () => {
  return (
    <div className='EMRHistory-container'>
        <div className='EMRHistory-header'>
            <input type="text" />
            <div className='EMRHistory-header-subdiv'>
                <span>Showing 1/1 Results</span>
                <button className='EMRHistory-button'>Print</button>
            </div>
        </div>
        <div className='EMRHistory-table'>
            <table>
                <thead>
                    <th>Visit Id</th>
                    <th>Visit Date</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <button className='EMRHistory-button'>View details</button>
                            <button className='EMRHistory-button'>edit</button>

                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
      
    </div>
  )
}

export default EMRHistory
