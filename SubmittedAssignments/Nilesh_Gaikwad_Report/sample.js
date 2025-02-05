class reportComponent extends HTMLElement {
    // Default configuration with class names for various elements
    defaultConfig = {
        containerClass: 'report-container',
        headerClass: 'report-header',
        titleClass: 'report-title',
        subtitleClass: 'report-subtitle',
        datePlaceClass:'datePlace',
        dateClass:'report-date',
        placeClass:'report-place',
        reportnameClass:"report-name",
        categoryWrapperClass: 'category-wrapper',
        CategoryNameClass:"category-name",
        tableNameClass:"table-name",
        detailsClass: 'report-details',
        itemsClass: 'report-items',
        tableClass: 'report-table',
        footerClass: 'report-footer',
    };

    // Default data
    defaultData = {
        title: "MARATHI KALARIPPAYATTU ASSOCIATION Organized And Supported By GURUK SPORTS ACADEMY SHIRWAL",
        subtitle: "1st MAHARASHTRA STATE JUNIOR (BOYS & GIRLS) KALARIPPAYATTU CHAMPIONSHIP 2023-24",
        date:"Date: Sep 4, 2024",
        place:"Place: Pune",
        tableName: "Merit List",
        CategoryName:"JUNIOR Male",
        items: [
                { "Sr.No.": "1", "Player Name (Players Reg.no.)": "SANSKAR SANTOSH-KUMAR KADAM (248)", "Medal": "GOLD", "Certificate No": 1 },
                { "Sr.No.": "2", "Player Name (Players Reg.no.)": "SANKET NAGESH DHANNAIK (249)", "Medal": "SILVER", "Certificate No": 2 },
                { "Sr.No.": "3", "Player Name (Players Reg.no.)": "ANSH KISHORE SOLASKAR (247)", "Medal": "BRONZE", "Certificate No": 3 }
            
        ],
        terms: [
            "Goods once sold cannot be taken back or exchanged.",
            "We are not the manufacturers; the company will stand for warranty as per their terms and conditions.",
        ]
    };

    constructor() {
        super();
        this.config = this.defaultConfig;
        this.data = this.defaultData;

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Load external CSS file
        const linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', 'CSS/style.css'); // Adjust the path if necessary
        shadow.appendChild(linkElement);

        // Create container for the invoice
        this.container = document.createElement('div');
        shadow.appendChild(this.container);
    }

    static get observedAttributes() {
        return ["config", "data"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'config' && newValue) {
                try {
                    const customConfig = JSON.parse(newValue);
                    this.config = { ...this.defaultConfig, ...customConfig };  // Merge the default config with the custom config
                } catch (e) {
                    console.error('Invalid config JSON:', e);
                }
            }
            if (name === 'data' && newValue) {
                try {
                    this.data = JSON.parse(newValue);
                } catch (e) {
                    console.error('Invalid data JSON:', e);
                }
            }
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.container.innerHTML = ''; // Clear previous content
    
        // Use the provided config and data, otherwise fall back to defaults
        const config = this.config || this.defaultConfig;
        const data = this.data || this.defaultData;
    
        // Apply the container class
        this.container.classList.add(config.containerClass);
    
        // Header
        const header = document.createElement('div');
        header.classList.add(config.headerClass);
          
        //Add Title
        const title = document.createElement('h1');
        title.textContent = data.title || this.defaultData.title;;
        title.classList.add(config.titleClass);
        header.appendChild(title);

         // Add Subtitle
         const subtitle = document.createElement('h2'); 
         subtitle.textContent = data.subtitle || this.defaultData.subtitle; // Fallback to default subtitle
         subtitle.classList.add(config.subtitleClass);
         header.appendChild(subtitle);

        // datePlace div
        const datePlace = document.createElement('div');
        datePlace.classList.add(config.datePlaceClass);
          
        //Add date
        const date = document.createElement('div');
        date.textContent = data.date || this.defaultData.date;;
        date.classList.add(config.dateClass);
        datePlace.appendChild(date);

         // Add place
         const place = document.createElement('div'); 
         place.textContent = data.place || this.defaultData.place; // Fallback to default subtitle
         place.classList.add(config.placeClass);
         datePlace.appendChild(place);

         header.appendChild(datePlace);
        
          this.container.appendChild(header);
        
    
         // Add Report Title
        const reportname =document.createElement('div');
        reportname.textContent = data.reportname || this.defaultData.reportname;
        reportname.classList.add(config.reportnameClass);
        this.container.appendChild(reportname);
           
         //Add Report Title

        // Report items div
        const items = document.createElement('div');
        items.classList.add(config.itemsClass);
        // this.container.appendChild(items);
        
        
        // const categoryWrapper = document.createElement('div');
        // categoryWrapper.classList.add('category-wrapper');
        
        

        // Add Category Name
        const CategoryName =document.createElement('div');
        CategoryName.textContent = data.CategoryNameName || this.defaultData.CategoryName;
        CategoryName.classList.add(config.CategoryNameClass);
        items.appendChild(CategoryName);


        // Add table name
        const tableName =document.createElement('div');
        tableName.textContent = data.tableName || this.defaultData.tableName;
        tableName.classList.add(config.tableNameClass);
        items.appendChild(tableName);
    
        // this.container.appendChild(categoryWrapper);

        //Create a table
        const table = document.createElement('table');
        table.classList.add(config.tableClass);
        

       // Create the table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
       
     // Collect all unique keys from the items to create headers

    const allKeys = new Set();

    data.items.forEach(item => {
        Object.keys(item).forEach(key => {
            allKeys.add(key);
        });
    });

    allKeys.forEach(key => {
        if (key !== 'name') {
            headerRow.appendChild(this.createTableHeaderCell(key.charAt(0).toUpperCase() + key.slice(1)));
        }
    });
    

    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create the table body
    const tbody = document.createElement('tbody');
    data.items.forEach(item => {
        const row = document.createElement('tr');

        // Create cells based on the collected keys
        allKeys.forEach(key => {
            if (key !== 'name') {
                row.appendChild(this.createTableCell(item[key] !== undefined ? item[key] : ''));
            }
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    items.appendChild(table);
    this.container.appendChild(items);
    
        // Footer
        const footer = document.createElement('div');
        footer.classList.add(config.footerClass);
        footer.innerHTML = `<p class="${config.footerTextClass}">Thank you for your business!</p>`;
        this.container.appendChild(footer);
    }
    
    createTableHeaderCell(content) {
        const cell = document.createElement('th');
        cell.textContent = content;
        return cell;
    }

    createTableCell(content) {
        const cell = document.createElement('td');
        cell.textContent = content;
        return cell;
    }
}

// Define the custom element
customElements.define('report-component',reportComponent);
