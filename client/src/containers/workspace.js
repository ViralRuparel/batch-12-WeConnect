import React from 'react';
import { WorkSpaceCard, WorkSpaceContent } from '../components/WorkSpaceCard';
import { Carousel, Button } from '../components/Generic';
import Amenities from '../components/Amenities/Amenities';
import DaysRow from '../components/OpeningHours';

const Workspace = (props) => {
  const workspace = props.workspace;
  const images = workspace.images;
  const operationHours = workspace.operationHours;
  const amenities =
    workspace.workspaceAmenities.length > 0
      ? workspace.workspaceAmenities
      : ['Nothing to display'];
  const listOfAmenities = amenities.map((amenity) => {
    return <p key={workspace._id + amenity}>{amenity}</p>;
  });

  const showRooms = (e) => {
    props.history.push(
      `/room/${props.workspace.locationId}/${props.workspace._id}/rooms`,
      {
        operationHours: workspace.operationHours,
        ownerId: workspace.owner,
        locationName: workspace.locationName,
        locationId: workspace.locationId,
        workspaceName: workspace.name,
        workspaceId: workspace._id,
      },
    );
  };

  return (
    <WorkSpaceCard>
      <Carousel showArrows={true} showThumbs={false} autoPlay emulateTouch>
        {images.map((image) => {
          return (
            <div>
              <img src={image} alt="workspace" />
            </div>
          );
        })}
      </Carousel>
      <WorkSpaceContent
        name={workspace.name || 'Unavailable'}
        locationName={workspace.locationName}
        location={workspace.address.fullAddress || 'Address not available'}
        maxSeat={workspace.maxSeat || '0'}
        rooms={workspace.rooms || '0'}
      />

      <Amenities>{listOfAmenities}</Amenities>
      <DaysRow operationHours={operationHours} />
      <Button
        color="primary"
        variant="contained"
        fullWidth={true}
        onClick={showRooms}
      >
        Explore
      </Button>
    </WorkSpaceCard>
  );
};

export default Workspace;
