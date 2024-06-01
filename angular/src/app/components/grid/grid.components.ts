import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import 'ag-grid-enterprise';


@Component({
  selector: 'grid',
  templateUrl: './grid.components.html',
  styleUrls: ['./grid.components.css'],
})

export class AGGridComponent implements OnInit {
  public gridApi: GridApi = new GridApi();
  public gridColumnApi: any;
  public ColDef: any;
  public statusBar: any;
  public rowModelType: any;
  public rowData: [] = [];
  public paginationFlag: boolean = false;
  public paginationSize: any;
  public selectedNodes: string = '';

  // Ag-grid Parameters
  @Input() public dataApi: any;
  @Input() public agColumns: any;
  @Input() public allowSideBar: any;
  @Input() public sizeColumnsToFit: any;
  @Input() public pagination: boolean = false;
  @Input() public paginationPageSize: any;
  @Input() public agStyle: any;

  ngOnInit(): void {
    this.ColDef = this.agColumns[0]; // Columns to be used in ag-grid are dynamically fetched from TypeScript Object ag-columns class file ag-columns.ts
    this.rowModelType = 'serverSide';
    this.paginationFlag = this.pagination; // enables pagination in the grid
    this.paginationSize = this.paginationPageSize; // sets 10 rows per page (default is 100)
  }

  constructor(private http: HttpClient) {}

  // Server Side AG-Grid Datasource initialization
  createServerSideDatasource(server: any) {
    return {
      getRows: function (params: any) {
        var response = server.getData(params.request);
        setTimeout(function () {
          if (response.success) {
            params.success({ rowData: response.rows });
          } else {
            params.fail();
          }
        }, 500);
      },
    };
  }

  createFakeServer(allData: any) {
    return {
      getData: function (request: any) {
        var requestedRows = allData.slice();
        return {
          success: true,
          rows: requestedRows,
        };
      },
    };
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http.get(this.dataApi).subscribe((data: any) => {
        var fakeServer = this.createFakeServer(data);
        var datasource = this.createServerSideDatasource(fakeServer);
        params.api.setServerSideDatasource(datasource);

        // Handle Sidebar visibility provided by variable allowSideBar
        if (this.allowSideBar == 'true') {
          params.api.setSideBar('columns');
          params.api.setSideBarVisible('true');

          this.statusBar = {
            statusPanels: [
              { statusPanel: 'agTotalRowCountComponent', align: 'left' },
              { statusPanel: 'agFilteredRowCountComponent' },
              { statusPanel: 'agSelectedRowCountComponent' },
              { statusPanel: 'agAggregationComponent' },
            ],
          };
          params.api.closeToolPanel();
        }

        // AutoSize Columns to fit provided by variable sizeColumnsToFit
        if (this.sizeColumnsToFit == 'true') {
          params.api.sizeColumnsToFit();
        }
      });
  }

  // Handling row selections
  onRowSelected(event:any) {
    if(event.node.selected) { 
      this.selectedNodes = this.selectedNodes + "," + event.data.id;  
    } else { 
      this.selectedNodes = this.selectedNodes.replace(","+event.data.id,"");
      this.selectedNodes = this.selectedNodes.replace(event.data.id+",","");
      this.selectedNodes = this.selectedNodes.replace(event.data.id,"");
    }

    if(this.selectedNodes.charAt(0) === ',') {
      this.selectedNodes = this.selectedNodes.substring(1);
    }
  }
  
  onSelectionChanged(event:any) {
    // do the rest
  }
}
