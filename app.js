// Main application script for Modern Order Management System

// Add error handling for Vue initialization
window.addEventListener('error', function(event) {
  console.error('Global error caught:', event.error);
});

// Initialize Vue application with error handling
document.addEventListener('DOMContentLoaded', function() {
  try {
    console.log('DOM loaded, initializing Vue app');
    
    // Initialize Vue application
    const app = Vue.createApp({
      data() {
        return {
          // Navigation and view state
          currentView: 'dashboard',
          settingsTab: 'fields',
          showAdvancedSearch: false,
          
          // Work orders data
          workOrders: [],
          parts: [],
          
          // Pagination
          currentPage: 1,
          itemsPerPage: 10,
          
          // Sorting
          sortKey: 'due_date',
          sortDirection: 'asc',
          
          // Search filters
          searchFilters: {
            order_id: '',
            requested_by: '',
            customer: '',
            status: '',
            technician: '',
            priority: '',
            wo_type: '',
            due_date: '',
            location: ''
          },
          
          // Editing state
          editingWorkOrder: {
            id: null,
            order_id: '',
            requested_by: '',
            customer: '',
            status: 'Requested',
            technician: '',
            priority: 'Regular',
            wo_type: '',
            due_date: '',
            location: '',
            sched_date: '',
            sched_time: '',
            recurring: false,
            every_freq: '',
            frequency: 'days',
            start_on: '',
            end_on: '',
            description: '',
            notes: '',
            transporter_name: '',
            transporter_id: '',
            work_order_no: '',
            order_date: '',
            dispatcher_date: ''
          },
          
          editingPart: {
            id: null,
            work_order_id: null,
            name: '',
            size: '',
            additional_note: ''
          },
          
          // Recurring settings
          recurringSettings: {
            every_freq: 1,
            frequency: 'weeks',
            start_on: '',
            end_on: '',
            copy_parts: true
          },
          
          // Work order to delete
          workOrderToDelete: null,
          
          // Configuration - Initialize with default values to prevent undefined errors
          fieldConfig: {
            order_id: {enabled: true, label: "Order ID", required: true, order: 1},
            requested_by: {enabled: true, label: "Requested By", required: true, order: 2},
            customer: {enabled: true, label: "Customer", required: true, order: 3},
            status: {enabled: true, label: "Status", required: true, order: 4},
            technician: {enabled: true, label: "Technician", required: false, order: 5},
            priority: {enabled: true, label: "Priority", required: true, order: 6},
            wo_type: {enabled: true, label: "WO Type", required: false, order: 7},
            due_date: {enabled: true, label: "Due Date", required: false, order: 8},
            location: {enabled: true, label: "Location", required: false, order: 9},
            sched_date: {enabled: true, label: "Sched. Date", required: false, order: 10},
            sched_time: {enabled: true, label: "Sched. Time", required: false, order: 11},
            recurring: {enabled: true, label: "Recurring", required: false, order: 12},
            every_freq: {enabled: true, label: "Every Freq.", required: false, order: 13},
            frequency: {enabled: true, label: "Frequency", required: false, order: 14},
            start_on: {enabled: true, label: "Start On", required: false, order: 15},
            end_on: {enabled: true, label: "End On", required: false, order: 16},
            description: {enabled: true, label: "Description", required: false, order: 17},
            notes: {enabled: true, label: "Notes", required: false, order: 18},
            transporter_name: {enabled: true, label: "Transporter Name", required: false, order: 19},
            transporter_id: {enabled: true, label: "Transporter ID", required: false, order: 20},
            work_order_no: {enabled: true, label: "Work Order No.", required: false, order: 21},
            order_date: {enabled: true, label: "Order Date", required: false, order: 22},
            dispatcher_date: {enabled: true, label: "Dispatcher Date", required: false, order: 23}
          },
          statusConfig: [
            {value: "Requested", label: "Requested", color: "#FFC107"},
            {value: "Pending", label: "Pending", color: "#2196F3"},
            {value: "Approved", label: "Approved", color: "#4CAF50"},
            {value: "Scheduled", label: "Scheduled", color: "#9C27B0"},
            {value: "Completed", label: "Completed", color: "#4CAF50"}
          ],
          priorityConfig: [
            {value: "Urgent", label: "Urgent", color: "#F44336"},
            {value: "Regular", label: "Regular", color: "#2196F3"},
            {value: "Low", label: "Low", color: "#9E9E9E"}
          ],
          uiConfig: {
            theme: {
              primary_color: '#1976D2',
              secondary_color: '#424242',
              accent_color: '#82B1FF',
              background_color: '#FFFFFF',
              text_color: '#212121'
            },
            logo: '',
            company_name: 'Modern Order Management',
            date_format: 'MM/DD/YYYY',
            time_format: 'HH:mm',
            items_per_page: 10
          },
          
          // Modal instances
          workOrderModal: null,
          partModal: null,
          recurringModal: null,
          deleteModal: null,
          
          // Chart instances
          statusChart: null
        };
      },
      
      computed: {
        // Calculate total pages for pagination
        totalPages() {
          return Math.ceil(this.workOrders.length / this.itemsPerPage);
        },
        
        // Get paginated and sorted work orders
        sortedWorkOrders() {
          const start = (this.currentPage - 1) * this.itemsPerPage;
          const end = start + this.itemsPerPage;
          
          // Sort work orders
          const sorted = [...this.workOrders].sort((a, b) => {
            let valueA = a[this.sortKey];
            let valueB = b[this.sortKey];
            
            // Handle date comparison
            if (this.sortKey.includes('date') && valueA && valueB) {
              valueA = new Date(valueA);
              valueB = new Date(valueB);
            }
            
            if (valueA === valueB) return 0;
            
            if (this.sortDirection === 'asc') {
              return valueA < valueB ? -1 : 1;
            } else {
              return valueA > valueB ? -1 : 1;
            }
          });
          
          return sorted.slice(start, end);
        }
      },
      
      methods: {
        // Initialize the application
        async initialize() {
          try {
            console.log('Initializing application...');
            
            // Load configuration
            await this.loadConfig();
            
            // Load work orders
            await this.loadWorkOrders();
            
            // Initialize modals
            this.initModals();
            
            // Initialize charts
            this.initCharts();
            
            // Apply theme
            this.applyTheme();
            
            console.log('Application initialized successfully');
          } catch (error) {
            console.error('Error initializing application:', error);
          }
        },
        
        // Load system configuration
        async loadConfig() {
          try {
            console.log('Loading configuration...');
            const response = await axios.get('/api/config');
            console.log('Config response:', response);
            
            if (response.data.success) {
              const config = response.data.data;
              // Merge with defaults to ensure all properties exist
              if (config.fields) {
                this.fieldConfig = {...this.fieldConfig, ...config.fields};
              }
              if (config.statuses && config.statuses.length > 0) {
                this.statusConfig = config.statuses;
              }
              if (config.priorities && config.priorities.length > 0) {
                this.priorityConfig = config.priorities;
              }
              if (config.ui) {
                this.uiConfig = {...this.uiConfig, ...config.ui};
                if (config.ui.theme) {
                  this.uiConfig.theme = {...this.uiConfig.theme, ...config.ui.theme};
                }
              }
              this.itemsPerPage = this.uiConfig.items_per_page || 10;
              console.log('Configuration loaded successfully');
            }
          } catch (error) {
            console.error('Error loading configuration:', error);
            // Continue with default configuration
            console.log('Using default configuration');
          }
        },
        
        // Load work orders
        async loadWorkOrders() {
          try {
            console.log('Loading work orders...');
            const response = await axios.get('/api/work-orders');
            if (response.data.success) {
              this.workOrders = response.data.data || [];
              console.log(`Loaded ${this.workOrders.length} work orders`);
            }
          } catch (error) {
            console.error('Error loading work orders:', error);
            this.workOrders = [];
          }
        },
        
        // Load parts for a work order
        async loadParts(workOrderId) {
          try {
            console.log(`Loading parts for work order ${workOrderId}...`);
            const response = await axios.get(`/api/work-orders/${workOrderId}/parts`);
            if (response.data.success) {
              this.parts = response.data.data || [];
              console.log(`Loaded ${this.parts.length} parts`);
            }
          } catch (error) {
            console.error('Error loading parts:', error);
            this.parts = [];
          }
        },
        
        // Initialize Bootstrap modals
        initModals() {
          try {
            console.log('Initializing modals...');
            this.workOrderModal = new bootstrap.Modal(document.getElementById('workOrderModal'));
            this.partModal = new bootstrap.Modal(document.getElementById('partModal'));
            this.recurringModal = new bootstrap.Modal(document.getElementById('recurringModal'));
            this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
            console.log('Modals initialized successfully');
          } catch (error) {
            console.error('Error initializing modals:', error);
          }
        },
        
        // Initialize charts
        initCharts() {
          try {
            console.log('Initializing charts...');
            this.$nextTick(() => {
              const ctx = document.getElementById('statusChart');
              if (ctx) {
                // Count work orders by status
                const statusCounts = {};
                this.statusConfig.forEach(status => {
                  statusCounts[status.value] = this.workOrders.filter(wo => wo.status === status.value).length;
                });
                
                // Get colors from status config
                const statusColors = this.statusConfig.map(status => status.color);
                
                // Create chart
                this.statusChart = new Chart(ctx, {
                  type: 'doughnut',
                  data: {
                    labels: this.statusConfig.map(status => status.label),
                    datasets: [{
                      data: this.statusConfig.map(status => statusCounts[status.value]),
                      backgroundColor: statusColors,
                      borderWidth: 1
                    }]
                  },
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right'
                      }
                    }
                  }
                });
                console.log('Chart initialized successfully');
              } else {
                console.log('Status chart element not found');
              }
            });
          } catch (error) {
            console.error('Error initializing charts:', error);
          }
        },
        
        // Apply theme colors
        applyTheme() {
          try {
            console.log('Applying theme...');
            document.documentElement.style.setProperty('--primary-color', this.uiConfig.theme.primary_color);
            document.documentElement.style.setProperty('--secondary-color', this.uiConfig.theme.secondary_color);
            document.documentElement.style.setProperty('--accent-color', this.uiConfig.theme.accent_color);
            document.documentElement.style.setProperty('--background-color', this.uiConfig.theme.background_color);
            document.documentElement.style.setProperty('--text-color', this.uiConfig.theme.text_color);
            console.log('Theme applied successfully');
          } catch (error) {
            console.error('Error applying theme:', error);
          }
        },
        
        // Format date according to configuration
        formatDate(dateString) {
          if (!dateString) return '';
          try {
            const date = new Date(dateString);
            
            // Format based on configuration
            if (this.uiConfig.date_format === 'MM/DD/YYYY') {
              return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            } else if (this.uiConfig.date_format === 'DD/MM/YYYY') {
              return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            } else {
              return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            }
          } catch (error) {
            console.error('Error formatting date:', error);
            return '';
          }
        },
        
        // Get status style
        getStatusStyle(status) {
          try {
            const statusConfig = this.statusConfig.find(s => s.value === status);
            return statusConfig ? { backgroundColor: statusConfig.color } : {};
          } catch (error) {
            console.error('Error getting status style:', error);
            return {};
          }
        },
        
        // Toggle advanced search
        toggleAdvancedSearch() {
          this.showAdvancedSearch = !this.showAdvancedSearch;
        },
        
        // Search work orders
        async searchWorkOrders() {
          try {
            console.log('Searching work orders...');
            // Build query parameters
            const params = {};
            for (const [key, value] of Object.entries(this.searchFilters)) {
              if (value) {
                params[key] = value;
              }
            }
            
            const response = await axios.get('/api/work-orders', { params });
            if (response.data.success) {
              this.workOrders = response.data.data || [];
              this.currentPage = 1;
              console.log(`Found ${this.workOrders.length} work orders`);
            }
          } catch (error) {
            console.error('Error searching work orders:', error);
          }
        },
        
        // Reset search filters
        resetSe
(Content truncated due to size limit. Use line ranges to read in chunks)