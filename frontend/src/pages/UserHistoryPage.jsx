import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar, Typography,
  Pagination, Chip, Box, Container, Fade, Slide,
  Tooltip, Skeleton
} from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';

/**
 * Component to display paginated points history for a single user or all users.
 */
const PointsHistory = () => {
  const { userId } = useParams(); // Get userId from route
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const theme = useTheme();
  const trigger = useScrollTrigger();

  /**
   * Fetch user(s) point history from the API.
   */
  const fetchHistory = async (page = 1) => {
    try {
      setLoading(true);
      const url = `/api/points/history/${userId || 'all'}`;
      const params = { page, limit: pagination.limit };

      const response = await axios.get(url, { params });

      setHistory(response.data.data.history);
      setPagination((prev) => ({
        ...prev,
        page,
        total: response.data.data.pagination.total,
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(); // Fetch history when component mounts or userId changes
  }, [userId]);

  const handlePageChange = (_, newPage) => {
    fetchHistory(newPage);
  };

  /**
   * Renders a single row of the history table.
   */
  const renderTableRow = (record, index) => (
    <TableRow
      hover
      key={record._id}
      sx={{
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      {!userId && (
        <TableCell>
          <Box display="flex" alignItems="center">
            <Tooltip title={record.userId?.name || 'Unknown User'}>
              <Avatar
                src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${record.userId?.name || 'unknown'}`}
                sx={{
                  mr: 2,
                  width: 40,
                  height: 40,
                  border: `2px solid ${theme.palette.primary.main}`,
                }}
              />
            </Tooltip>
            <Typography variant="body1" fontWeight={500}>
              {record.userId?.name || 'Unknown User'}
            </Typography>
          </Box>
        </TableCell>
      )}
      <TableCell>
        <Chip
          label={`+${record.points}`}
          color="primary"
          size="small"
          sx={{
            fontWeight: 600,
            boxShadow: theme.shadows[2],
            '&:hover': { boxShadow: theme.shadows[4] },
          }}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {format(new Date(record.claimedAt), 'MMM dd, yyyy')}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {format(new Date(record.claimedAt), 'hh:mm a')}
        </Typography>
      </TableCell>
    </TableRow>
  );

  /**
   * Renders loading skeleton UI.
   */
  const renderLoading = () => (
    <Container maxWidth="xl">
      <Box my={4}>
        <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" width="100%" height={72} sx={{ mb: 1 }} />
        ))}
      </Box>
    </Container>
  );

  /**
   * Renders an error message if something goes wrong.
   */
  const renderError = () => (
    <Slide direction="down" in={trigger} mountOnEnter unmountOnExit>
      <Box my={4} textAlign="center">
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    </Slide>
  );

  // Render the main UI
  return loading ? renderLoading() : error ? renderError() : (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Fade in={!loading} timeout={500}>
        <Box>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 4,
              }}
            >
              {userId ? 'User Points History' : 'All Users Points History'}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Paper
              elevation={6}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                background:
                  theme.palette.mode === 'dark'
                    ? 'rgba(30, 30, 40, 0.8)'
                    : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{
                        background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                      }}
                    >
                      {!userId && (
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                          User
                        </TableCell>
                      )}
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Points</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 600 }}>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map(renderTableRow)}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Pagination */}
            {pagination.total > pagination.limit && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    },
                    '& .Mui-selected': {
                      boxShadow: theme.shadows[4],
                      fontWeight: 'bold',
                    },
                  }}
                />
              </Box>
            )}
          </motion.div>
        </Box>
      </Fade>
    </Container>
  );
};

export default PointsHistory;
