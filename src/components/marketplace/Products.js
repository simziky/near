import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddProduct from "./AddProduct";
import Campaign from "./Product";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getCampaigns as getCampaignList,
  donateFunds,
  createCampaign,
} from "../../utils/marketplace";

const Products = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to get the list of products
  const getAllCampaign = useCallback(async () => {
    try {
      setLoading(true);
      setCampaigns(await getCampaignList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addCampaign = async (data) => {
    try {
      setLoading(true);
      createCampaign(data).then((resp) => {
        getAllCampaign();
      });
      toast(<NotificationSuccess text="Cmpaign created successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a campaign." />);
    } finally {
      setLoading(false);
    }
  };

  //  function to initiate transaction
  const contribute = async (id, price) => {
    try {
      await donateFunds({
        id,
        price,
      }).then((resp) => getAllCampaign());
      toast(<NotificationSuccess text="Contributed to campaign successfully" />);
    } catch (error) {
      toast(<NotificationError text="Failed to contrubute to campaign." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCampaign();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Street Food</h1>
            <AddProduct save={addCampaign} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {campaigns.map((_campaign) => (
              <Campaign
              campaign={{
                  ..._campaign,
                }}
                contribute={contribute}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Products;
