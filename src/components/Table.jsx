import React, { useEffect, useState } from "react";
import "./Table.css";
import Axios from "axios";

// const projects = [
//   { id: 1, percentageFunded: '80%', amountPledged: '$10,000' },
//   { id: 2, percentageFunded: '50%', amountPledged: '$5,000' },
//   { id: 3, percentageFunded: '100%', amountPledged: '$20,000' },
//   { id: 4, percentageFunded: '90%', amountPledged: '$18,000' },
//   { id: 5, percentageFunded: '70%', amountPledged: '$14,000' },
//   { id: 6, percentageFunded: '60%', amountPledged: '$8,000' },
//   { id: 7, percentageFunded: '40%', amountPledged: '$4,000' },
//   { id: 8, percentageFunded: '30%', amountPledged: '$3,000' },
//   { id: 9, percentageFunded: '20%', amountPledged: '$2,000' },
//   { id: 10, percentageFunded: '10%', amountPledged: '$1,000' },
// ];

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(projects.length / recordsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedProjects = projects.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  async function getAllProjects() {
    try {
      const allProjects = await Axios.get(
        "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
      );

      setProjects(allProjects.data);
    } catch (err) {
      console.log({ err });
    }
  }

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="table-container">
      <table className="project-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProjects.map((project, index) => (
            <tr key={project.id}>
              <td>{startIndex + index + 1}</td>
              <td>{project["percentage.funded"]}</td>
              <td>{project["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        )}
        {/* {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))} */}
        <button className="active">{currentPage}</button>
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Table;
