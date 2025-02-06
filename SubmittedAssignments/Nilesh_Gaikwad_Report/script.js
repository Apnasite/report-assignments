class IssueComponent extends HTMLElement {
    static get observedAttributes() {
        return ["config", "data"];
    }

    config = [
        {
            formLabel: "form-label",
            formClass: "form-control"
        }
    ];

    data = [
        { label: "Report Name", type: "text", required: true, className: "col-3 col-md-2 rounded-pill ms-3", placeholder: "Enter Your Report Name" },
        { label: "Candidate Name", type: "text", required: true, className: "col-3 col-md-2 rounded-pill ms-3", placeholder: "Enter Your Candidate Name" },
        { label: "Category Name", type: "select", options: ["Male", "Female", "Other"], required: true, className: "col-3 col-md-2 rounded ms-3", placeholder: "Select Your Category" },
        { label: "Medal", type: "text", required: true, className: "col-3 col-md-2 rounded ms-3", placeholder: "Enter Medal Type" },
        { label: "Certificate No.", type: "number", required: true, className: "col-3 col-md-2 rounded ms-3", placeholder: "Enter Certificate No" },
        { label: "button", type: "submit", value: "Submit", className: "col-3 col-md-3 rounded-pill ms-3", id: "submit_button" }
    ];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.formValues = {}; // Store form input values
    }

    connectedCallback() {
        this.renderComponent();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "config" && newValue) {
            this.config = JSON.parse(newValue);
        }
        if (name === "data" && newValue) {
            this.data = JSON.parse(newValue);
        }
        this.renderComponent();
    }

    renderComponent() {
        this.shadowRoot.innerHTML = "";

        const bootstrapLink = document.createElement("link");
        bootstrapLink.setAttribute("rel", "stylesheet");
        bootstrapLink.setAttribute("href", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css");
        this.shadowRoot.appendChild(bootstrapLink);

        const form = document.createElement("form");
        form.className = "row g-3 mt-5 rounded";

        this.data.forEach((field) => {
            const formGroup = document.createElement("div");
            formGroup.className = `${field.className || "col-12"} mb-3`;

            const label = document.createElement("label");
            label.className = this.config[0]?.formLabel || "form-label";
            label.textContent = field.label;

            let input;
            if (field.type === "select") {
                input = document.createElement("select");
                input.className = `${this.config[0]?.formClass || "form-select"} rounded-pill`;
                input.required = field.required || false;

                field.options?.forEach((option) => {
                    const optionElement = document.createElement("option");
                    optionElement.value = option.toLowerCase();
                    optionElement.textContent = option;
                    input.appendChild(optionElement);
                });
            } else if (field.type === "submit") {
                input = document.createElement("button");
                input.type = "submit";
                input.className = `${this.config[0]?.formClass || "btn btn-primary"} ${field.className}`;
                input.textContent = field.value;
                input.id = field.id || field.label.toLowerCase().replace(/\s+/g, "_");
            } else {
                input = document.createElement("input");
                input.type = field.type;
                input.placeholder = field.placeholder || "";
                input.className = `${this.config[0]?.formClass || "form-control"} rounded-pill`;
                input.required = field.required || false;
                input.id = field.label.toLowerCase().replace(/\s+/g, "_");
            }

            formGroup.appendChild(label);
            formGroup.appendChild(input);
            form.appendChild(formGroup);

            input.addEventListener("input", () => this.updateFormData());
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("Form submitted:", this.formValues);
        });

        this.shadowRoot.appendChild(form);
        this.updateFormData();
    }

    updateFormData() {
        const formData = {};
        this.shadowRoot.querySelectorAll("input, select").forEach((inputElement) => {
            formData[inputElement.previousElementSibling.textContent] = inputElement.value;
        });
        console.log("Form data:", formData);
    }
}

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
        addSectionButtonTextClass: 'add-section-btn-text',
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
          
        // Add Title
        const title = document.createElement('h1');
        title.textContent = data.title || this.defaultData.title;
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
          
        // Add date
        const date = document.createElement('div');
        date.textContent = data.date || this.defaultData.date;
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
        const reportname = document.createElement('div');
        reportname.textContent = data.reportname || this.defaultData.reportname;
        reportname.classList.add(config.reportnameClass);
        this.container.appendChild(reportname);
    
        // Add Report items div
        const items = document.createElement('div');
        items.classList.add(config.itemsClass);

        // Create table and category sections
        this.createTableSection(items, data, config);

        // Append the items div to container
        this.container.appendChild(items);
    
        // Footer
        const footer = document.createElement('div');
        footer.classList.add(config.footerClass);
        footer.innerHTML = `<p class="${config.footerTextClass}">Thank you for your business!</p>`;
        this.container.appendChild(footer);
    }

    createTableSection(items, data, config) {
        // Add Category Name
        const CategoryName = document.createElement('div');
        CategoryName.textContent = data.CategoryNameName || this.defaultData.CategoryName;
        CategoryName.classList.add(config.CategoryNameClass);
        items.appendChild(CategoryName);

        // Add table name
        const tableName = document.createElement('div');
        tableName.textContent = data.tableName || this.defaultData.tableName;
        tableName.classList.add(config.tableNameClass);
        items.appendChild(tableName);

        // Create a table wrapper
        const tableWrapper = document.createElement('div');
        tableWrapper.classList.add('table-wrapper'); // You can add custom styles here

        // Create a table
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
        tableWrapper.appendChild(table);

        // Add the table wrapper to the items container
        items.appendChild(tableWrapper);

        // Add the "Add Section" button below the table body
        const addSectionButton = this.createAddSectionButton(config, data);
        tbody.appendChild(addSectionButton); // Append the button directly after the table body
    }

    createAddSectionButton(config, data) {
        // Create the button
        const button = document.createElement('button');
        button.classList.add(config.addSectionButtonTextClass);
        button.textContent = data.addSectionButtonText || 'Add Another Section';
        
        // Add click event listener to add new section
        button.addEventListener('click', () => {
            const items = this.container.querySelector('.report-items');
            this.createTableSection(items, data, config);
        });
        
        return button;
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
customElements.define("issue-component", IssueComponent);

