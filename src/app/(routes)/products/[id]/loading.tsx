import { Col, Row, Skeleton, Space } from "antd";

export default function Loading() {
  return (
    <Row gutter={[48, 48]}>
      <Col xs={24} md={12}>
        <Skeleton.Image
          active
          style={{
            width: "100%",
            height: 500,
          }}
        />
      </Col>

      <Col xs={24} md={12}>
        <Space
          direction="vertical"
          size="large"
          style={{ width: "100%" }}
        >
          <Skeleton.Input
            active
            block
            size="large"
          />

          <Skeleton
            active
            paragraph={{ rows: 6 }}
          />

          <Skeleton.Button
            active
            block
            size="large"
          />
        </Space>
      </Col>
    </Row>
  );
}