import React, { useState, useEffect } from 'react';
import './Paid.css';
import a from './ido.jpg';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination';
const Paid = ({ search,user }) => {
 const [currentPage, setCurrentPage] = useState(1);
 const [recordsPerPage] = useState(6);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = user?.products?.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(user?.products?.length / recordsPerPage);


console.log(user.products);
  return (
    <div className="mainsss" id="Paid">
      <div className=" container">
        <div className="row pb-4">
          {currentRecords
            ?.filter((temp) => {
              if (search === '') {
                return temp;
              } else if (
                temp.type.toLowerCase().includes(search.toLowerCase())
              ) {
                return temp;
              }
            })
            .map((temp) => (
              <div className="col col-12 col-lg-4 mt-5" key={temp.id}>
                <Link
                  to={`/detail/${temp.templateId}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div>
                    <div className="imageHolder55">
                      <img src={temp.imageUrls || a} alt="" className="mama" />
                    </div>
                    <div style={{ marginTop: '30px' }}>
                      <div className="itemname2">{temp.name}</div>
                      <div className="price"> ₦ {temp.price}</div>
                      <div className="category">{temp.type}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Paid;
