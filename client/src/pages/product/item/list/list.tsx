import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Pagination, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/atom/button/button";
import Container from "../../../../components/atom/container/container";
import Header from "../../../../components/atom/heading/header";
import Input from "../../../../components/atom/input/input";
import Admin from "../../../../components/templates/dashboard/admin";
import { deleteData, get } from "../../../../services/dataServices";
import "./list.scss";

interface ListProps {}

interface DataType {
  key: string;
  dataIndex: string;
  title: string;
}

const List: React.FC<ListProps> = () => {
  const navigate = useNavigate();
  const listUrl = "get-all-product";
  const deleteUrl = "delete-product";
  const [data, setData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [total, setTotal] = useState<any>(0);
  const [current, setCurrent] = useState<any>(1);
  const fetchData = async (page?: number, pageSize = 10) => {
    let fetchedData: any;
    if (page) {
      fetchedData = await get(
        listUrl +
          "?page=" +
          page +
          "&perPage=" +
          pageSize +
          "&search=" +
          searchValue
      );
    } else {
      fetchedData = await get(
        listUrl + "?perPage=" + pageSize + "&search=" + searchValue
      );
    }
    setData(fetchedData.data.data);
    setTotal(fetchedData.data.total);
    setCurrent(fetchedData.data.current_page);
  };
  const handleDelete = async (record: any) => {
    await deleteData(deleteUrl, record.id);
    fetchData();
  };

  const handleEdit = async (record: any) => {
    navigate("/product/item/edit/" + record.id);
  };

  const columns: ColumnsType<DataType> = [
    {
      key: "product_name",
      dataIndex: "product_name",
      title: "Product Name",
    },
    {
      key: "brand",
      dataIndex: "brand",
      title: "Brand",
    },
    {
      key: "category",
      dataIndex: "category",
      title: "Category",
    },
    {
      key: "selling_price",
      dataIndex: "selling_price",
      title: "Selling Price",
    },
    {
      key: "stock",
      dataIndex: "stock",
      title: "Stock",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              handleEdit(record);
            }}
          />
          <DeleteOutlined
            onClick={async () => {
              await handleDelete(record);
            }}
          />
        </Space>
      ),
    },
  ];

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleCreateNew = () => {
    navigate("/product/item/create");
  };

  const handleSearchClick = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, ["data"]);

  return (
    <Admin type="light">
      <div className="p-productList">
        <Header Tag="h2" text="All Product" />
        <Container margin="12">
          <div className="p-productList__topBar">
            <Input
              label={false}
              placeHolder="Search"
              name="search"
              type="text"
              onChange={handleSearch}
              value={searchValue}
            />
            <Button
              label="Search"
              onClick={handleSearchClick}
              disabled={false}
              type="primary"
            ></Button>
            <Button
              label="Create New"
              onClick={handleCreateNew}
              disabled={false}
            ></Button>
          </div>
        </Container>
        <Container margin="24">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            size="small"
          />
        </Container>
        <Container margin="8">
          <Pagination
            defaultCurrent={6}
            onChange={fetchData}
            total={total}
            size="small"
            current={current}
          />
        </Container>
      </div>
    </Admin>
  );
};

export default List;
