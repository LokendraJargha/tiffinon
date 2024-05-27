import React from 'react';
import { Form, Input } from 'antd';

const EditableCell = ({
  editing,
  dataindex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input disabled={record && (record.file_type==='mp4' && record.media_type === 'medias')}/>;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataindex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;