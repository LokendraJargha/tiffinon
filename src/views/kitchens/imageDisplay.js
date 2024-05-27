import React from "react";
import { Card, Empty, Image } from "antd";

const ImageDisplay = ({ loading, uploads, column }) => {
  return (
    <div>
      <Card
        title="Documents"
        size="small"
        style={{ marginBottom: "2rem" }}
        loading={loading}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${column}, 1fr)`,
          }}
        >
          {uploads.length > 0 &&
            uploads.map((item, index) => {
              const { upload } = item;
              return (
                <div key={index} className="images">
                  <Image
                    src={`${process.env.REACT_APP_BACKEND_URL}/${upload.save_path}`}
                    width={200}
                  />
                </div>
              );
            })}
        </div>
        {uploads.length < 1 && (
          <Empty description={<span>No documents has been uploaded.</span>} />
        )}
      </Card>
    </div>
  );
};

export default ImageDisplay;
