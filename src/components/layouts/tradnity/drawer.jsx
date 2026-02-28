import React, { useEffect, useState } from "react";
import { Button, Drawer, Input, Radio, Space } from "antd";
import { MdClose, MdFilterAlt } from "react-icons/md";
import { BsFilter } from "react-icons/bs";

const ShopDrawer = ({
  Category,
  FilterCategories,
  CategoriesAllFunc,
  FlashSaleFunc,
  flashSale,
  min,
  max,
  setMin,
  setMax,
  FilterPrices,
  filtersproduct,
}) => {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const [mins, setMins] = useState(0);
  const [maxs, setMaxs] = useState(100000); // better default
  const [value, setValue] = useState("All");
  const [flashValue, setFlashValue] = useState(flashSale ? "Yes" : "No");

  const showDrawer = () => {
    setOpen((prev) => !prev);
    // Option: keep DOM way with safety (but prefer CSS class method)
    const header = document.querySelector(".header");
    if (header) {
      header.style.zIndex = open ? "1000" : "1"; // adjust values as needed
    }
  };

  const onClose = () => {
    setOpen(false);
    const header = document.querySelector(".header");
    if (header) {
      header.style.zIndex = ""; // or "1000" / your default
    }
  };

  // Mobile detection
  useEffect(() => {
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setDrop(true);
    }
  }, []);

  // Price range from products
  useEffect(() => {
    if (!filtersproduct?.length) return;

    const prices = filtersproduct
      .map((item) => {
        const price = Number(item?.api?.price);
        return isNaN(price) ? null : price;
      })
      .filter((p) => p !== null);

    if (prices.length > 0) {
      setMins(Math.min(...prices));
      setMaxs(Math.max(...prices));
    }
  }, [filtersproduct]);

  const onChange = (e) => {
    setFlashValue("No");
    setValue(e.target.value);

    if (e.target.value !== "All") {
      FilterCategories(e.target.value);
    } else {
      CategoriesAllFunc();
    }
  };

  const onChangeFlash = (e) => {
    setFlashValue(e.target.value);
    setValue("All");
    FlashSaleFunc(e.target.value);
  };

  const onChangeInputMin = (e) => {
    setMins(Number(e.target.value) || 0);
  };

  const onChangeInputMax = (e) => {
    setMaxs(Number(e.target.value) || 0);
  };

  return (
    <>
      <Space>
        <div
          style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
          onClick={showDrawer}
        >
          <h3 className="text-dark margin5x mx-1" style={{ fontWeight: "600" }}>
            FILTER
          </h3>
          {open ? (
            <MdClose className="margin5x mx-1" size={30} />
          ) : (
            <BsFilter className="margin5x mx-1" size={30} />
          )}
        </div>
      </Space>

      <Drawer
        title="Filter Products"
        placement="right"
        width={drop ? "100vw" : 500}
        onClose={onClose}
        open={open}
      >
        <div>
          <br />
          <h3 className="fw-bold text-dark" style={{ letterSpacing: "1.5px", fontSize: "15px" }}>
            CATEGORIES:
          </h3>
          <br />

          <Radio.Group buttonStyle="solid" onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio.Button style={{ height: 36 }} value="All">
                All
              </Radio.Button>
              {Category?.map((category, key) => (
                <Radio.Button key={key} style={{ height: 36 }} value={category.name}>
                  {category.name}
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>

          <br /><br /><br />

          <div style={{ display: "flex", alignItems: "center" }}>
            <h3
              className="fw-bold text-dark"
              style={{ letterSpacing: "1.5px", fontSize: "15px", marginTop: "10px", marginRight: "15px" }}
            >
              FLASH SALE:
            </h3>
            <Radio.Group value={flashValue} onChange={onChangeFlash} buttonStyle="solid">
              <Space direction="horizontal">
                <Radio.Button style={{ height: 36 }} value="Yes">Yes</Radio.Button>
                <Radio.Button style={{ height: 36 }} value="No">No</Radio.Button>
              </Space>
            </Radio.Group>
          </div>

          <br /><br /><br />

          <h3
            className="fw-bold text-dark"
            style={{ letterSpacing: "1.5px", fontSize: "15px", marginTop: "10px" }}
          >
            FILTER BY PRICE:
          </h3>
          <br />

          <div className="row align-items-center">
            <div className="col-md-5">
              <Input
                placeholder="Min Price"
                type="number"
                value={mins}
                onChange={onChangeInputMin}
                className="py-2"
              />
            </div>

            <div className="col-md-5">
              <Input
                placeholder="Max Price"
                type="number"
                value={maxs}
                onChange={onChangeInputMax}
                className="py-2"
              />
            </div>

            <div className="col-md-2 mt-3 mt-md-0">
              <button
                className="btn dangerBtn w-100"
                style={{ borderRadius: 8 }}
                onClick={() => {
                  setFlashValue("No");
                  setValue("All");
                  FilterPrices(mins, maxs);
                }}
              >
                <MdFilterAlt style={{ fill: "#fff" }} size={25} />
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ShopDrawer;