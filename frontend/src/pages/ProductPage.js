import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  CardOverflow,
  Divider,
  Stack,
  Typography,
} from "@mui/joy";
import { ReactComponent as Profile } from "../assets/Profill.svg";
import { ReactComponent as Skyler } from "../assets/skyler.svg";
import { ReactComponent as Henry } from "../assets/henry.svg";

import { Heart } from "lucide-react";
import { Rating } from "@mui/material";

import { ReactComponent as CarIcon } from "../assets/carImage.svg";
import theme from "../themes";

// Reusable ProductDetailItem Component
const ProductDetailItem = ({ label, value }) => (
  <Stack
    spacing={1}
    direction="row"
    alignItems="center"
    justifyContent="space-between"
  >
    <Typography
      level="body3"
      sx={{ mr: 1, color: "#90A3BF", fontWeight: "400" }}
    >
      {label}
    </Typography>
    <Typography level="body3" sx={{ color: "#596780", fontWeight: "600" }}>
      {value}
    </Typography>
  </Stack>
);

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [bids, setBids] = useState([]);

  // Simulating an API call to fetch product details and bids
  useEffect(() => {
    const fetchData = async () => {
      const productData = {
        name: "Nissan GT-R",
        description:
          "NISMO has become the embodiment of Nissan's outstanding performance, inspired by the most unforgiving proving ground, the 'race track'.",

        rating: 4,
        reviews: 450,
        type: "Sport",
        steering: "Manual",
        capacity: "2 Person",
        gasoline: "70L",
        topBid: 88666,
        author: {
          name: "Alex Stanton",
          role: "CEO at Bukalapak",
        },
      };

      const bidData = [
        {
          id: 1,
          user: "Tom Henry",
          amount: 88666,
          date: "21 July 2022",
          avatar: Henry, // Replace with actual avatar image path
          role: "Manager",
          phone: "+1 234 567 890",
        },
        {
          id: 2,
          user: "Skyler Dias",
          amount: 82990,
          date: "20 July 2022",
          avatar: Skyler, // Replace with actual avatar image path
          role: "Designer",
          phone: "+1 987 654 321",
        },
      ];

      setProduct(productData);
      setBids(bidData);
    };

    fetchData();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ pb: 3 }}>
      <Box
        sx={{
          mx: "auto",
          pt: 2,
          gap: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
        }}
      >
        <CardOverflow
          sx={{
            flex: { xs: "1 1 100%", md: "1 1 50%" },
            p: 3,
            borderRadius: "12px",
            position: "relative",
            bgcolor: "#3563E9",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack sx={{ pt: 5, width: "100%" }}>
            <Stack
              spacing={2}
              sx={{ color: "white", mb: 8, width: { xs: "100%", md: "50%" } }}
            >
              <Typography level="h2" sx={{ color: "white", mb: 2 }}>
                Sports car with the best design and acceleration
              </Typography>
              <Typography level="body-sm" sx={{ color: "white" }}>
                Safety and comfort while driving a futuristic and elegant sports
                car
              </Typography>
            </Stack>
          </Stack>

          <Box
            sx={{
              maxWidth: { xs: "300px", md: "400px" },
              width: "100%",
              alignSelf: "flex-start",
              display: "flex",
              justifyContent: "center",
              paddingBottom: { xs: 4, md: 0 },
            }}
          >
            <CarIcon
              sx={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </Box>
        </CardOverflow>

        {/* Right Section with Product Info and Bids */}
        <CardContent
          sx={{
            p: 3,
            backgroundColor: "white",
            flex: { xs: "1 1 100%", md: "1 1 50%" },
            borderRadius: "12px",
          }}
        >
          {/* Product Information */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <Stack spacing={1} sx={{ width: "100%", mb: 5 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography level="h4">{product.name}</Typography>
                <Heart />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Rating
                  value={product.rating}
                  readOnly
                  sx={{ "& .MuiRating-iconFilled": { color: "#FFD700" } }}
                />
                <Typography level="body-sm">
                  ({product.reviews}+ Reviews)
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Typography level="body-md" sx={{ color: "neutral.600", mb: 5 }}>
            {product.description}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              columnGap: 5,
              rowGap: 3,
              mb: 5,
            }}
          >
            <ProductDetailItem label="Type" value={product.type} />
            <ProductDetailItem label="Capacity" value={product.capacity} />
            <ProductDetailItem label="Steering" value={product.steering} />
            <ProductDetailItem label="Gasoline" value={product.gasoline} />
          </Box>

          {/* Owner and Bid Info */}
          <Stack direction="column" spacing={2} sx={{ mb: 5 }}>
            <Typography
              level="body-md"
              sx={{ color: "#1A202C", fontWeight: "700" }}
            >
              Owned by:
            </Typography>

            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Profile size="lg" />
                <Stack spacing={0.5}>
                  <Typography level="body-md" fontWeight="bold">
                    {product.author.name}
                  </Typography>
                  <Typography level="body-sm" sx={{ color: "#90A3BF" }}>
                    {product.author.role}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Stack spacing={0.5} alignItems="flex-end">
                  <Typography level="body-sm" sx={{ color: "#90A3BF" }}>
                    21 July 2024
                  </Typography>
                  <Rating
                    value={product.rating}
                    readOnly
                    sx={{ "& .MuiRating-iconFilled": { color: "#FFD700" } }}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Divider sx={{ px: 4 }} />
          </Stack>

          {/* Place Bid Button */}
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
            <Typography level="h2">
              ${Number(product.topBid).toLocaleString()}
            </Typography>
            <Button size="lg" sx={{ bgcolor: "#3563E9" }}>
              Place Bid
            </Button>
          </Stack>
        </CardContent>
      </Box>
      <Box sx={{ mt: 5, p: 3, borderRadius: "12px", bgcolor: "white" }}>
        <Stack direction="row" alignItems="flex-start">
          <Typography
            level="h5"
            sx={{ fontSize: "24px", fontWeight: "700", mb: 2, mr: 1 }}
          >
            Bids:
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.primary,
              color: "white",
              borderRadius: "8px",
              px: 1.5,
              py: 1,
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            {String(bids.length).padStart(2, "0")}
          </Box>
        </Stack>

        <Stack spacing={2}>
          {bids.map((bid) => (
            <Stack
              key={bid.id}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ py: 1 }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <bid.avatar size="lg" />
                  <Stack spacing={0.5}>
                    <Typography level="body-md" fontWeight="bold">
                      {bid.user}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Typography level="body-sm" sx={{ color: "#90A3BF" }}>
                        {bid.role}
                      </Typography>
                      <Typography level="body-sm" sx={{ color: "#90A3BF" }}>
                        {bid.phone}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Stack direction="column" alignItems="flex-end">
                <Typography level="h5" fontWeight="bold">
                  ${Number(bid.amount).toLocaleString()}
                </Typography>
                <Typography level="body-sm" sx={{ color: "#90A3BF" }}>
                  {bid.date}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductPage;
