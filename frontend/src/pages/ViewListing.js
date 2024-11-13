// The ViewListing component displays a detailed view of a car listing, 
// including product info, bidding functionality, and modals for placing and accepting bids.
// The component provides a UI to place a bid or accept an existing bid, 
// and dynamically updates the bid list as bids are placed.

// Libs
import React, { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../themes";

// Components
import { Box, Button, CardContent, CardOverflow, Divider, Stack, Typography } from "@mui/joy";
import { LockIcon } from "lucide-react";
import { ReactComponent as Skyler } from "../assets/skyler.svg";
import { ReactComponent as Henry } from "../assets/henry.svg";
import { Heart } from "lucide-react";
import { ReactComponent as CarIcon } from "../assets/carImage.svg";

// Modals
import PlaceBidModal from "../components/UniversalComponents/PlaceBidModal";
import AcceptBidModal from "../components/UniversalComponents/AcceptBidModal";

// Define the API endpoint URL
const API_URL = process.env.REACT_APP_API_URL;

// Reusable ProductDetailItem Component
const ProductDetailItem = ({ label, value }) => <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">

    <Typography level="body3" sx={{ mr: 1, color: "#90A3BF", fontWeight: "400", textTransform: "capitalize" }}> {label} </Typography>

    <Typography level="body3" sx={{ color: "#596780", fontWeight: "600", textTransform: "capitalize" }}> {value} </Typography>

</Stack>

const ViewListing = () => {

  // For data
  const [product, setProduct] = useState(null);
  const [bidId, setBidId] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [sellerName, setSellerName] = useState(null);
  const [newbids, setNewBids] = useState([]);

  // Deal id
  const { id } = useParams(); // Get ID from URL parameters
  const [dealId, setDealId] = useState(id);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

  // Navigate to other pages
  const navigate = useNavigate();

  // Open the modal for placing new bid
  const handleOpenModal = () => {
    
    // If the user is not authenticated, redirect
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {

      navigate("/login", { state: { from: window.location.pathname } });

      return
    }

    setDealId(id);
    setIsModalOpen(true);
  
  }

  // Unlock a bid
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

  // Close modals
  const handleCloseModal = () => { setIsModalOpen(false); setIsAcceptModalOpen(false) };

  // Helper function to format date
  const formatDate = (dateString) => {

    const date = new Date(dateString);

    const options = { year: "numeric", month: "long", day: "numeric" };

    return date.toLocaleDateString(undefined, options);

  };

  // Hook to load the deal data
  // Will run once the deal id is loaded
  useEffect(() => {

    // Function to place the request
    const fetchProduct = async () => {

      try {

        // Token
        var token = localStorage.getItem("token");

        // Send request to server
        const response = await axios.get(`${ API_URL }/deals/${id}/`, {

          headers: {
            ... token ? { Authorization: `Bearer ${localStorage.getItem("token")}` } : { },
          },

        });

        // Loaded
        if (response.data.success) {

          // Set seller details
          setIsSeller(response.data.is_seller);
          setSellerName(response.data.seller);

          // Store car data
          setNewProduct(response.data.deal); 

          // And bids
          setNewBids(response.data.bids);

        }

      } 
      catch (error) {

        console.error("Failed to fetch product:", error);

      }

    };

    fetchProduct();

  }, [id]);

  // Load sample data to set the ui
  // Run this first thing when the ui loads
  useEffect(() => {

    const fetchData = async () => {

      const productData = {

        name: "Nissan GT-R",
        description: "NISMO has become the embodiment of Nissan's outstanding performance, inspired by the most unforgiving proving ground, the 'race track'.",
        rating: 4,
        reviews: 450,
        type: "Sport",
        steering: "Manual",
        capacity: "2 Person",
        gasoline: "70L",
        topBid: 88666,

        author: {
          name: "Alex Stanton",
          role: "CEO at Bukalapak"
        }

      };

      // Set to state
      setProduct(productData);
    };

    fetchData();

  }, []);

  // Show loader
  if (!newProduct) {

    return <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>

      <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}>

        <Typography level="h2" sx={{ color: theme.colors.primary }}>Wheels Hub</Typography>

      </motion.div>
    </Box>
  }

  // Render contnet
  return <Box sx={{ pb: 6, pt: 5 }}>

    {/* Main Box with Padding */}
    <Box sx={{ mx: "auto", pt: 2, gap: 2, display: "flex", flexDirection: { xs: "column", md: "row" }, width: "100%" }} >

      {/* Left Section: Card with Image */}
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
          alignItems: "center"
        }}

      >

        {/* Details */}
        <Stack sx={{ pt: 5, width: "100%" }}>

          <Stack spacing={2} sx={{ color: "white", mb: 8, width: { xs: "100%", md: "50%" } }}>

            {/* Car Title and Subtitle */}
            <Typography level="h2" sx={{ color: "white", mb: 2 }}>Car with the best design and acceleration</Typography>

            {/* Dynamic product title */}
            <Typography level="body-sm" sx={{ color: "white" }}>{newProduct.title}</Typography>

          </Stack>

        </Stack>

        {/* Car icon */}
        <Box sx={{ maxWidth: { xs: "300px", md: "400px" }, width: "100%", alignSelf: "flex-start", display: "flex", justifyContent: "center", paddingBottom: { xs: 4, md: 0 } }}>
          
          <CarIcon sx={{ width: "100%", height: "auto", objectFit: "contain" }} />
          
        </Box>

      </CardOverflow>

      {/* Right Section: Product Information and Bids */}
      <CardContent sx={{ p: 3, backgroundColor: "white", flex: { xs: "1 1 100%", md: "1 1 50%" }, borderRadius: "12px" }}>

        {/* Product Information */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>

          {/* Title */}
          <Stack spacing={1} sx={{ width: "100%", mb: 5 }}>

            <Stack direction="row" justifyContent="space-between">

              {/* Product make and model */}
              <Typography level="h4" sx={{ textTransform: "capitalize" }}> {newProduct.make} - {newProduct.model} </Typography>

              {/* Heart icon */}
              <Heart /> 

            </Stack>

          </Stack>

        </Box>

        {/* Product Description */}
        <Typography level="body-md" sx={{ color: "neutral.600", mb: 5, textTransform: "capitalize" }}>{newProduct.description}</Typography>

        {/* Product Details Grid */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", columnGap: 5, rowGap: 3, mb: 5 }}>
          
          <ProductDetailItem label="Type" value={newProduct.body_type} />
          <ProductDetailItem label="Capacity" value={product.capacity} />
          <ProductDetailItem label="Steering" value={newProduct.transmission} />
          <ProductDetailItem label={newProduct.fuel_type} value={newProduct.engine_capacity} />
          
        </Box>

        {/* Owner and Bid Info Section */}
        <Stack direction="column" spacing={2} sx={{ mb: 5 }}>

          {/* Title */}
          <Typography level="body-md" sx={{ color: "#1A202C", fontWeight: "700" }}>Owned by:</Typography>

          {/* Seller Info */}
          <Stack direction="row" justifyContent="space-between">

            <Stack direction="row" alignItems="center" spacing={2}>

              {/* Avatar */}
              <img src={`https://ui-avatars.com/api/?name=${sellerName}`} style={{ height: 45, width: "auto", borderRadius: 80 }}/>

              {/* Name */}
              <Stack spacing={0.5}>

                <Typography level="body-md" fontWeight="bold" sx={{ textTransform: "capitalize" }}>{sellerName}</Typography>

                <Typography level="body-sm" sx={{ color: "#90A3BF" }}>{product.author.role}</Typography>

              </Stack>

            </Stack>

            {/* Date of Listing */}
            <Stack direction="row" alignItems="center" spacing={2}>

              <Stack spacing={0.5} alignItems="flex-end">
                
                <Typography level="body-sm" sx={{ color: "#90A3BF" }}>
                  
                  {/* Format and display the product's creation date */}
                  { formatDate(newProduct.created_at) } 

                </Typography>

              </Stack>

            </Stack>

          </Stack>

          {/* Divider between sections */}
          <Divider sx={{ px: 4 }} /> 

        </Stack>

        {/* Price and Bid Button */}
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>

          <Typography level="h2">
            
            {/* Display formatted price */}
            ${ Number(newProduct.price).toLocaleString() } 

          </Typography>

          {/* Conditional Render: Place Bid Button */}
          { !isSeller && <Button size="lg" sx={{ bgcolor: "#3563E9" }} onClick={handleOpenModal}>Place Bid</Button> }

        </Stack>

      </CardContent>
      
    </Box>

    {/* Bids Section, only render if the user has bids or the user is seller */}
    <Box sx={{ mt: 5, p: 3, borderRadius: "12px", bgcolor: "white", ...(newbids.length == 0 && !isSeller ? { display: "none" } : {}) }}>

      {/* Check if there are bids */}
      {
      
        newbids && newbids.length > 0 ?

          // Render bids
          <Fragment>
          
            {/* Title and the count */}
            <Stack direction="row" alignItems="flex-start">

              {/* Dynamic title based on user type */}
              <Typography level="h5" sx={{ fontSize: "24px", fontWeight: "700", mb: 2, mr: 1 }}>

                {isSeller ? "Received Bids" : "Your Bids"}

              </Typography>

              {/* Count */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.primary, color: "white", borderRadius: "8px", px: 1.5, py: 1, fontSize: "14px", fontWeight: "700" }}>
                
                { String(newbids.length).padStart(2, "0") }
                
              </Box>

            </Stack>

            {/* Render the bids */}
            <Stack spacing={2}>

              {/* Map through bids and display */}
              {
              
                newbids.map((bid) => <Stack key={bid.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>

                  <Stack direction="row" justifyContent="space-between">

                    <Stack direction="row" alignItems="center" spacing={2}>

                      {/* Avatar */}
                      <img src={`https://ui-avatars.com/api/?name=${bid.buyer_name}`} style={{ height: 50, width: "auto", borderRadius: 80 }}/>

                      {/* Buy name and details */}
                      <Stack spacing={0.5}>

                        <Typography level="body-md" fontWeight="bold">{bid.buyer_name}</Typography>

                        {/* Details about bid */}
                        <Stack direction="row" spacing={2}>

                          <Typography level="body-sm" sx={{ color: "#90A3BF" }}>{bid.message}</Typography>
                          
                          {/* Render bid contact if this is the bidder or the seller if the bid is unlocked */}
                          <Typography level="body-sm" sx={{ color: "#90A3BF" }}>

                            { 
                            
                              bid.status === "accepted" || !isSeller ? 
                              
                                bid.buyer_contact
                                
                              : 
                              
                                <Typography onClick={() => handleAcceptOpenModal(bid.id)} level="body-sm" sx={{ color: "#90A3BF", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>Unlock Contact <LockIcon color="#90A3BF" size="14px" /> </Typography> 

                            }
                                
                          </Typography>
                          
                        </Stack>

                      </Stack>

                    </Stack>

                  </Stack>

                  {/* Display the bid price and date posted */}
                  <Stack direction="column" alignItems="flex-end">

                    <Typography level="h5" fontWeight="bold">
                      
                      ${ Number(bid.amount).toLocaleString() } 
                      
                    </Typography>
                    
                    <Typography level="body-sm" sx={{ color: "#90A3BF" }}>
                      
                      { formatDate(bid.created_at) }

                    </Typography>

                  </Stack>

                </Stack>
                
                )
                
              }

            </Stack>

          </Fragment>
      
      : 
              
        // Message when no bids are available for seller
        <Typography level="h4" sx={{ textAlign: "center", color: "#D1D1D1" }}>No bids yet </Typography>

      }
      
    </Box>

    {/* Modal for placing bid */}
    <PlaceBidModal open={isModalOpen} handleClose={handleCloseModal} dealId={dealId} />
    
    {/* Accept bid */}
    <AcceptBidModal open={isAcceptModalOpen} handleClose={handleCloseModal} bidId={bidId} />

  </Box>
};

export default ViewListing;
