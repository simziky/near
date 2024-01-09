import React from "react";
import PropTypes from "prop-types";
import { utils } from "near-api-js";
import { Card, Button, Col, Badge, Stack } from "react-bootstrap";

const Campaign = ({ campaign, buy }) => {
  const { id, goal, name, description,donators, raised, location, image, owner } =
    campaign;

  const triggerBuy = () => {
    buy(id, goal);
  };

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">{owner}</span>
            <Badge bg="secondary" className="ms-auto">
              {donators} backers
            </Badge>
          </Stack>
        </Card.Header>
        <div className=" ratio ratio-4x3">
          <img src={image} alt={name} style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="flex-grow-1 ">{description}</Card.Text>
          <Card.Text className="text-secondary">
            <span>{location}</span>
          </Card.Text>
          <Card.Text className="text-secondary"
          style={{display: 'flex', justifyContent: 'space-between'}}
          >
            <div>{utils.format.formatNearAmount(goal)}</div>
            <div>{utils.format.formatNearAmount(raised)}</div>
          </Card.Text>
          <Button
            variant="outline-dark"
            className="w-100 py-3"
            onClick={triggerBuy}
          >
            Buy for {utils.format.formatNearAmount(goal)} NEAR
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Campaign.propTypes = {
  campaign: PropTypes.instanceOf(Object).isRequired,
  buy: PropTypes.func.isRequired,
};

export default Campaign;
