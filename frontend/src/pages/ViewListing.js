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
import { LockIcon } from "lucide-react";
import { motion } from "framer-motion";

import { ReactComponent as Skyler } from "../assets/skyler.svg";
import { ReactComponent as Henry } from "../assets/henry.svg";
import { useParams } from "react-router-dom"; // Import useParams
import { Heart } from "lucide-react";

import axios from "axios";
import { ReactComponent as CarIcon } from "../assets/carImage.svg";
import theme from "../themes";
import PlaceBidModal from "../components/UniversalComponents/PlaceBidModal";
import AcceptBidModal from "../components/UniversalComponents/AcceptBidModal";

import { useNavigate } from "react-router-dom";

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
      sx={{
        mr: 1,
        color: "#90A3BF",
        fontWeight: "400",
        textTransform: "capitalize",
      }}
    >
      {label}
    </Typography>
    <Typography
      level="body3"
      sx={{ color: "#596780", fontWeight: "600", textTransform: "capitalize" }}
    >
      {value}
    </Typography>
  </Stack>
);

const ViewListing = () => {
  const [product, setProduct] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidId, setBidId] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [sellerName, setSellerName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenModal = () => {
    
    // If the user is not authenticated, redirect
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      navigate("/login", { state: { from: window.location.pathname } });

      return
    }

    setIsModalOpen(true);
  
  }
  const handleAcceptOpenModal = (bidId) => {
    
    // If the user is not authenticated, redirect
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      navigate("/login", { state: { from: window.location.pathname } });

      return
    }

    setBidId(bidId);
    setIsAcceptModalOpen(true);
  
  }
  const handleCloseModal = () => { setIsModalOpen(false); setIsAcceptModalOpen(false) };

  const [newbids, setNewBids] = useState([]);

  const { id } = useParams(); // Get ID from URL parameters
  const [dealId, setDealId] = useState(id);

  const [loading, setLoading] = useState(true);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Token
        var token = localStorage.getItem("token");

        const response = await axios.get(`http://localhost:8000/deals/${id}/`, {
          headers: {
            ... token ? { Authorization: `Bearer ${localStorage.getItem("token")}` } : { },
          },
        });
        setIsSeller(response.data.is_seller);
        setSellerName(response.data.seller);

        if (response.data.success) {
          setNewProduct(response.data.deal); // Set product data
          setNewBids(response.data.bids);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (!newProduct) {
    return (
      <>
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Typography level="h2" sx={{ color: theme.colors.primary }}>
              Wheels Hub
            </Typography>
          </motion.div>
        </Box>
      </>
    );
  }

  return (
    <Box sx={{ pb: 6, pt: 5 }}>
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
                Car with the best design and acceleration
              </Typography>
              <Typography level="body-sm" sx={{ color: "white" }}>
                {newProduct.title}
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
                <Typography level="h4" sx={{ textTransform: "capitalize" }}>
                  {newProduct.make} - {newProduct.model}
                </Typography>
                <Heart />
              </Stack>
            </Stack>
          </Box>

          <Typography
            level="body-md"
            sx={{ color: "neutral.600", mb: 5, textTransform: "capitalize" }}
          >
            {newProduct.description}
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
            <ProductDetailItem label="Type" value={newProduct.body_type} />
            <ProductDetailItem label="Capacity" value={product.capacity} />
            <ProductDetailItem
              label="Steering"
              value={newProduct.transmission}
            />
            <ProductDetailItem
              label={newProduct.fuel_type}
              value={newProduct.engine_capacity}
            />
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
                <img src={`https://ui-avatars.com/api/?name=${ sellerName }`} style={{ height: 45, width: "auto", borderRadius: 80 }} />
                <Stack spacing={0.5}>
                  <Typography
                    level="body-md"
                    fontWeight="bold"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {sellerName}
                  </Typography>
                  <Typography level="body-sm" sx={{ color: "#90A3BF" }}>
                    {product.author.role}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Stack spacing={0.5} alignItems="flex-end">
                  <Typography level="body-sm" sx={{ color: "#90A3BF" }}>
                    {formatDate(newProduct.created_at)}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Divider sx={{ px: 4 }} />
          </Stack>

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
            <Typography level="h2">
              ${Number(newProduct.price).toLocaleString()}
            </Typography>
            {!isSeller && (
              <Button
                size="lg"
                sx={{ bgcolor: "#3563E9" }}
                onClick={handleOpenModal}
              >
                Place Bid
              </Button>
            )}
          </Stack>
        </CardContent>
      </Box>

      {/* bids section here */}
      {isSeller && (
        <Box sx={{ mt: 5, p: 3, borderRadius: "12px", bgcolor: "white" }}>

          {newbids && newbids.length > 0 ? (
            <>
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
                {String(newbids.length).padStart(2, "0")}
              </Box>
            </Stack>

            <Stack spacing={2}>
              {newbids.map((bid) => (
                <Stack
                  key={bid.id}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ py: 1 }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      
                      <img src={`https://ui-avatars.com/api/?name=${ bid.buyer_name }`} style={{ height: 50, width: "auto", borderRadius: 80 }} />
                
                      <Stack spacing={0.5}>
                        <Typography level="body-md" fontWeight="bold">
                          {bid.buyer_name}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                          <Typography
                            level="body-sm"
                            sx={{ color: "#90A3BF" }}
                          >
                            {bid.message}
                          </Typography>
                          <Typography
                            level="body-sm"
                            sx={{ color: "#90A3BF" }}
                          >
                            { 
                            
                              bid.status === "placed" ? 
                              
                                <Typography onClick={() => handleAcceptOpenModal(bid.id)} level="body-sm" sx={{ color: "#90A3BF", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>Unlock Contact <LockIcon color="#90A3BF" size="14px" /> </Typography> 
                                
                              : 
                              
                                bid.buyer_contact
                                
                              }
                                
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
                      {formatDate(bid.created_at)}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </>
          ) : (
            <Typography
              level="body1"
              sx={{ color: "#90A3BF", textAlign: "center" }}
            >
              No bids for now
            </Typography>
          )}
          
        </Box>
      )}

      <PlaceBidModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        dealId={dealId}
      />

      <AcceptBidModal
        open={isAcceptModalOpen}
        handleClose={handleCloseModal}
        bidId={bidId}
      />

    </Box>
  );
};

export default ViewListing;
